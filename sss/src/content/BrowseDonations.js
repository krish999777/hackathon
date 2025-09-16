import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapPinIcon, ClockIcon, MagnifyingGlassIcon, CheckCircleIcon, ArrowsRightLeftIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import './BrowseDonations.css'; // We'll use the updated CSS file below

// =================================================================================
// UTILITY FUNCTIONS & CUSTOM HOOK (Unchanged, as logic is separate from display)
// =================================================================================
const deg2rad = (d) => d * (Math.PI / 180);
const getDistanceFromCoords = (coords) => {
  const MUMBAI_CENTER = { lat: 19.0760, lon: 72.8777 };
  if (!coords) return Math.round((Math.random() * 11 + 0.3) * 10) / 10;
  const R = 6371;
  const dLat = deg2rad(coords.lat - MUMBAI_CENTER.lat);
  const dLon = deg2rad(coords.lon - MUMBAI_CENTER.lon);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(MUMBAI_CENTER.lat)) * Math.cos(deg2rad(coords.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};
const getTimeToExpiryMs = (expiryOn) => {
  if (!expiryOn) return Infinity;
  return new Date(expiryOn).getTime() - Date.now();
};
const parseCoordsFromAddress = (address) => {
  if (!address) return null;
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
    return { lat: Number(parts[0]), lon: Number(parts[1]) };
  }
  return null;
};
const getStatusBadge = (status) => {
  if (status === 'notAccepted') return { text: 'Not Accepted', icon: <ArrowsRightLeftIcon className="icon-badge" />, type: 'gray' };
  if (status === 'pickingUp') return { text: 'Picking Up', icon: <TruckIcon className="icon-badge" />, type: 'amber' };
  if (status === 'completed') return { text: 'Completed', icon: <CheckBadgeIcon className="icon-badge" />, type: 'emerald' };
  return { text: '', icon: null, type: '' };
};
function timeLabel(expiryOn) {
  const ms = getTimeToExpiryMs(expiryOn);
  if (ms === Infinity) return '—';
  if (ms <= 0) return 'Expired';
  const hrs = Math.round(ms / 3600000);
  if (hrs < 24) return `In ${hrs} hours`;
  const days = Math.round(hrs / 24 / 3600000);
  return `In ${days} days`;
}
function generatePlaceholderImage(text) {
    const q = encodeURIComponent(text || 'food');
    return `https://source.unsplash.com/random/400x400/?${q}`;
}

function useDonations() {
  const [allDonations, setAllDonations] = useState([]);
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({ sortBy: 'time', vegOnly: false, minMeals: 1, query: '' });

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('foodlink_donations') || '[]');
    const normalized = raw.map((d, i) => ({
      id: d.id || `donation-${Date.now()}-${i}`,
      status: d.status || 'notAccepted',
      coords: parseCoordsFromAddress(d.address),
      itemName: d.itemName || (d.items && d.items.length > 0 ? d.items.map(item => item.name).join(', ') : 'Mixed Food'),
      ...d,
    }));
    setAllDonations(normalized);
  }, []);

  useEffect(() => {
    let out = allDonations
      .filter(d => d.status === 'notAccepted')
      .map(d => ({ ...d, _timeToExpiry: getTimeToExpiryMs(d.expiryOn), _distanceKm: getDistanceFromCoords(d.coords) }));

    if (filters.vegOnly) out = out.filter(d => (d.veg === 'veg' || d.veg === 'Veg' || d.veg === true));
    if (filters.minMeals) out = out.filter(d => Number(d.meals || 0) >= Number(filters.minMeals || 0));
    if (filters.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      out = out.filter(d => (d.itemName || '').toLowerCase().includes(q) || (d.items ? d.items.map(i=>i.name).join(' ').toLowerCase().includes(q) : false) || (d.contactName || '').toLowerCase().includes(q));
    }

    if (filters.sortBy === 'meals') out.sort((a, b) => (Number(b.meals || 0) - Number(a.meals || 0)));
    if (filters.sortBy === 'distance') out.sort((a, b) => (a._distanceKm - b._distanceKm));
    if (filters.sortBy === 'time') out.sort((a, b) => (a._timeToExpiry - b._timeToExpiry));

    setFilteredAndSorted(out);
    setCurrentIndex(0);
  }, [allDonations, filters]);

  const updateDonationStatus = useCallback((dId, status) => {
    setAllDonations(prev => prev.map(d => d.id === dId ? { ...d, status } : d));
    const raw = JSON.parse(localStorage.getItem('foodlink_donations') || '[]');
    const updated = raw.map(r => r.id === dId ? { ...r, status } : r);
    localStorage.setItem('foodlink_donations', JSON.stringify(updated));
  }, []);

  const nextDonation = useCallback(() => {
    if (filteredAndSorted.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % filteredAndSorted.length);
  }, [filteredAndSorted]);

  const currentDonation = filteredAndSorted[currentIndex] || null;
  return { filters, setFilters, currentDonation, updateDonationStatus, nextDonation, hasDonations: filteredAndSorted.length > 0 };
}

const DonationDetailsGrid = ({ label, value }) => (
  <>
    <div className="detail-label">{label}</div>
    <div className="detail-value">{value}</div>
  </>
);

// =================================================================================
// MAIN BROWSE DONATIONS PAGE COMPONENT
// =================================================================================
export default function BrowseDonations() {
  const { filters, setFilters, currentDonation, updateDonationStatus, nextDonation, hasDonations } = useDonations();

  const handleAccept = useCallback((dId) => {
    updateDonationStatus(dId, 'pickingUp');
  }, [updateDonationStatus]);
  const handleComplete = useCallback((dId) => {
    updateDonationStatus(dId, 'completed');
    nextDonation();
  }, [updateDonationStatus, nextDonation]);

  const { text: statusText, icon: statusIcon, type: statusType } = currentDonation ? getStatusBadge(currentDonation.status) : {};

  return (
    <div className="browse-donations-page">
      
      
      <main className="main-content">
        <div className="container main-layout">
          {/* Left Column: Filters Sidebar */}
          <aside className="filter-sidebar">
            <h3 className="sidebar-title">Filters</h3>
            <div className="filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <select id="sortBy" value={filters.sortBy} onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}>
                <option value="time">Expires Soonest</option>
                <option value="distance">Closest</option>
                <option value="meals">Highest Quantity</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Food Type</label>
              <div className="checkbox-control">
                <input id="vegOnly" type="checkbox" checked={filters.vegOnly} onChange={e => setFilters(prev => ({ ...prev, vegOnly: e.target.checked }))} />
                <label htmlFor="vegOnly">Veg Only</label>
              </div>
            </div>
            <div className="filter-group">
              <label htmlFor="minMeals">Minimum Meal Quantity</label>
              <input id="minMeals" type="number" min="1" value={filters.minMeals} onChange={e => setFilters(prev => ({ ...prev, minMeals: e.target.value }))} />
            </div>
            <div className="filter-group">
              <label htmlFor="searchQuery">Search</label>
              <div className="search-control">
                <MagnifyingGlassIcon className="search-icon" />
                <input id="searchQuery" placeholder="Food item or donor name" value={filters.query} onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))} />
              </div>
            </div>
          </aside>

          {/* Right Column: Donation Display */}
          <div className="content-panel">
            {!hasDonations ? (
              <div className="no-donations-card">
                <CheckCircleIcon className="no-donations-icon" />
                <h3 className="no-donations-title">All caught up!</h3>
                <p>No donations currently match your filters. Try adjusting your search criteria or come back later for new listings.</p>
              </div>
            ) : (
              <div className="donation-card">
                {currentDonation && (
                  <>
                    <div className="card-top-section">
                      <div className="card-image-wrapper">
                        <img alt={currentDonation.itemName} className="card-image" src={generatePlaceholderImage(currentDonation.itemName)} />
                      </div>
                      <div className="card-details">
                        <h2 className="card-title">
                          {currentDonation.items && currentDonation.items.length > 0 ? currentDonation.items.map(it => `${it.amount || ''} ${it.name || ''}`).join(', ') : currentDonation.itemName}
                        </h2>
                        <div className="details-grid">
                          <DonationDetailsGrid label="Number of Meals" value={currentDonation.meals || '—'} />
                          <DonationDetailsGrid label="Veg / Non-Veg" value={currentDonation.veg === 'veg' || currentDonation.veg === 'Veg' || currentDonation.veg === true ? 'Veg' : 'Non-Veg'} />
                          <DonationDetailsGrid label="Prepared On" value={currentDonation.preparedOn ? new Date(currentDonation.preparedOn).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'} />
                          <DonationDetailsGrid label="Expiry" value={timeLabel(currentDonation.expiryOn)} />
                          <DonationDetailsGrid label="Donor Type" value={currentDonation.contactType || '—'} />
                          <DonationDetailsGrid label="Donor Name" value={currentDonation.contactName || '—'} />
                          <DonationDetailsGrid label="Phone Number" value={currentDonation.contactPhone ? <a href={`tel:${currentDonation.contactPhone}`} className="phone-link">{currentDonation.contactPhone}</a> : '—'} />
                          <DonationDetailsGrid label="Address" value={currentDonation.address || '—'} />
                        </div>
                      </div>
                    </div>

                    <div className="card-bottom-section">
                      <div className={`status-badge status-${statusType}`}>{statusIcon} {statusText}</div>
                      <div className="action-buttons">
                        {currentDonation.status === 'notAccepted' && (
                          <button className="btn btn-primary" onClick={() => handleAccept(currentDonation.id)}>Accept Donation</button>
                        )}
                        {currentDonation.status === 'pickingUp' && (
                          <button className="btn btn-secondary" onClick={() => handleComplete(currentDonation.id)}>Mark Completed</button>
                        )}
                        <button className="btn btn-tertiary" onClick={nextDonation}>Next Donation</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}