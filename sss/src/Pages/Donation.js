import React, { useState } from 'react';

const Donation = () => {
  const [formData, setFormData] = useState({
    foodItemName: '',
    quantity: '',
    vegNonVeg: 'Veg',
    preparedOn: '',
    address: '',
    pickupName: '',
    pickupPhone: '',
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleUseLocation = (e) => {
    if (e.target.checked) {
      if (!navigator.geolocation) {
        alert("Sorry, Geolocation is not supported by your browser.");
        e.target.checked = false;
        return;
      }
      setIsFetchingLocation(true);
      setFormData(prevState => ({ ...prevState, address: 'Fetching location...' }));
      const success = async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            setFormData(prevState => ({ ...prevState, address: data.display_name }));
          } else {
            setFormData(prevState => ({ ...prevState, address: 'Could not determine address.' }));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setFormData(prevState => ({ ...prevState, address: 'Failed to fetch address.' }));
        } finally {
          setIsFetchingLocation(false);
        }
      };
      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        let errorMessage = 'Could not get your location.';
        if (err.code === 1) {
          errorMessage = 'Please allow location access to use this feature.';
        }
        alert(errorMessage);
        setFormData(prevState => ({ ...prevState, address: '' }));
        setIsFetchingLocation(false);
        e.target.checked = false;
      };
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setFormData(prevState => ({ ...prevState, address: '' }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '...';
    const date = new Date(dateString + 'T00:00:00'); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // REMOVED: const smallLabelStyle = { fontSize: '0.8rem' };

  return (
    <div className="container my-5"> {/* Increased top/bottom margin for more space */}
      <div className="row justify-content-center">
        {/* CHANGE 1: Increased column width from col-lg-8 to col-lg-10 for a wider form */}
        <div className="col-lg-10">
          
          <h2 className="text-success text-center mb-4" style={{fontWeight:'600'}}>Make a Donation 🌱</h2>
          
          <div className="row">
            {/* --- Left Column: Form --- */}
            <div className="col-md-7">
              <form >
                <h6 className="mt-3 mb-3 text-muted">Food Details</h6>
                {/* CHANGE 2: Increased vertical spacing from mb-1 to mb-3 */}
                <div className="mb-3">
                  {/* CHANGE 3: Removed inline style from label */}
                  <label htmlFor="foodItemName" className="form-label">Food Item Name</label>
                  {/* CHANGE 4: Removed form-control-sm for a larger input field */}
                  <input 
                    type="text" 
                    className="form-control" 
                    id="foodItemName"
                    name="foodItemName"
                    value={formData.foodItemName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label d-block">Veg / Non-Veg</label>
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="vegNonVeg" 
                      id="veg" 
                      value="Veg"
                      checked={formData.vegNonVeg === 'Veg'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="veg">Veg</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="vegNonVeg" 
                      id="nonVeg" 
                      value="Non-Veg"
                      checked={formData.vegNonVeg === 'Non-Veg'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="nonVeg">Non-Veg</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="preparedOn" className="form-label">Prepared On</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="preparedOn"
                    name="preparedOn"
                    value={formData.preparedOn}
                    onChange={handleChange}
                  />
                </div>
                
                <h6 className="mt-4 mb-3 text-muted">Pickup Location</h6>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3"> {/* Added spacing */}
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="useMyLocation"
                      onChange={handleUseLocation}
                      disabled={isFetchingLocation}
                    />
                    <label className="form-check-label" htmlFor="useMyLocation">Use my current location</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="pickupName" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="pickupName"
                    name="pickupName"
                    value={formData.pickupName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pickupPhone" className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="pickupPhone"
                    name="pickupPhone"
                    value={formData.pickupPhone}
                    onChange={handleChange}
                  />
                </div>
                
                {/* CHANGE 5: Removed btn-sm and increased top margin to mt-4 */}
                <button type="submit" className="btn w-100 mt-4" style={{ backgroundColor: '#348c64', color: 'white' }}>
                  Submit Donation
                </button>
              </form>
            </div>

            {/* --- Right Column: Donation Summary (with font size increase) --- */}
            <div className="col-md-5">
              {/* CHANGE 6: Increased font-size and padding for summary box */}
              <div className="p-3 rounded-3" style={{ backgroundColor: '#f3f9f9', border: '1px solid #d0e0e0', height: '100%', fontSize: '0.9rem' }}>
                <h5 className="mb-3" style={{color: '#348c64'}}>Donation Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Food Item</span>
                  <strong>{formData.foodItemName || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Quantity</span>
                  <strong>{formData.quantity || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Veg / Non-Veg</span>
                  <strong>{formData.vegNonVeg}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Prepared On</span>
                  <strong>{formatDate(formData.preparedOn)}</strong>
                </div>
                <div className="d-flex justify-content-between mt-3 mb-2">
                  <span className="text-muted">Address</span>
                  <strong>{formData.address || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Name</span>
                  <strong>{formData.pickupName || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Phone</span>
                  <strong>{formData.pickupPhone || '...'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;