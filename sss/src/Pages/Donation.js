// import React from 'react'

// const Donation = () => {
//   return (
//     <div>
//         <div className="container py-5">
    //   <h1 className="text-success text-center mb-4">Make a Donation 🌱</h1>
//       <p className="text-center text-muted">
//         Your contribution makes a real difference. Please fill out the form below.
//       </p>

//       <form className="mx-auto mt-4" style={{ maxWidth: "600px" }}>
//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input type="text" className="form-control" placeholder="Enter your name" />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email Address</label>
//           <input type="email" className="form-control" placeholder="Enter your email" />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Donation Amount (₹)</label>
//           <input type="number" className="form-control" placeholder="Enter amount" />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Message (Optional)</label>
//           <textarea className="form-control" rows="3" placeholder="Leave a note..." />
//         </div>

//         <button type="submit" className="btn btn-success w-100">
//           Donate Now 
//         </button>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default Donation
import React, { useState } from 'react';

const Donation = () => {
  // 1. Set up state to hold all form data
  const [formData, setFormData] = useState({
    foodItemName: '',
    quantity: '',
    vegNonVeg: 'Veg', // Default value
    preparedOn: '',
    address: '',
    pickupName: '',
    pickupPhone: '',
  });

  // State to manage the loading status of the location fetch
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  // --- New Function to Handle Location Fetching ---
  const handleUseLocation = (e) => {
    if (e.target.checked) {
      if (!navigator.geolocation) {
        alert("Sorry, Geolocation is not supported by your browser.");
        e.target.checked = false; // Uncheck the box if not supported
        return;
      }

      setIsFetchingLocation(true);
      setFormData(prevState => ({ ...prevState, address: 'Fetching location...' }));

      // Success callback
      const success = async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap's free reverse geocoding API
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

      // Error callback
      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        let errorMessage = 'Could not get your location.';
        if (err.code === 1) { // PERMISSION_DENIED
          errorMessage = 'Please allow location access to use this feature.';
        }
        alert(errorMessage);
        setFormData(prevState => ({ ...prevState, address: '' })); // Clear the field on error
        setIsFetchingLocation(false);
        e.target.checked = false; // Uncheck the box on error
      };

      navigator.geolocation.getCurrentPosition(success, error);

    } else {
      // Clear the address field if the user unchecks the box
      setFormData(prevState => ({ ...prevState, address: '' }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '...';
    const date = new Date(dateString + 'T00:00:00'); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const smallLabelStyle = { fontSize: '0.8rem' };


  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          <h2 className="text-success text-center mb-3" style={{fontWeight:'600'}}>Make a Donation 🌱</h2>
          
          <div className="row">
            {/* --- Left Column: Form --- */}
            <div className="col-md-7">
              <form >
                <h6 className="mt-3 mb-2 text-muted">Food Details</h6>
                <div className="mb-1">
                  <label htmlFor="foodItemName" className="form-label" style={smallLabelStyle}>Food Item Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="foodItemName"
                    name="foodItemName"
                    value={formData.foodItemName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="quantity" className="form-label" style={smallLabelStyle}>Quantity</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="mb-1">
                  <label htmlFor="numberOfMeals" className="form-label" style={smallLabelStyle}>Number of Meals</label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm" 
                    id="numberOfMeals"
                    name="numberOfMeals"
                    value={formData.numberOfMeals}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="mb-1">
                  <label className="form-label d-block" style={smallLabelStyle}>Veg / Non-Veg</label>
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
                    <label className="form-check-label" htmlFor="veg" style={smallLabelStyle}>Veg</label>
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
                    <label className="form-check-label" htmlFor="nonVeg" style={smallLabelStyle}>Non-Veg</label>
                  </div>
                </div>
                <div className="mb-1">
                  <label htmlFor="preparedOn" className="form-label" style={smallLabelStyle}>Prepared On</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm" 
                    id="preparedOn"
                    name="preparedOn"
                    value={formData.preparedOn}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="mb-1">
                  <label htmlFor="expiry" className="form-label" style={smallLabelStyle}>Expiry / Best Before</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                </div> */}
                

                <h6 className="mt-3 mb-2 text-muted">Pickup Location</h6>
                <div className="mb-1">
                  <label htmlFor="address" className="form-label" style={smallLabelStyle}>Address</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                 {/* <div className="d-flex align-items-center mb-1">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="useMyLocation" />
                        <label className="form-check-label" htmlFor="useMyLocation" style={smallLabelStyle}>Use my location</label>
                    </div>
                    <img src="https://i.imgur.com/8O2b4jA.png" alt="Map placeholder" className="ms-auto" style={{width: '90px', borderRadius: '6px'}}/>
                </div> */}
                <div className="d-flex align-items-center mb-1">
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="useMyLocation"
                      onChange={handleUseLocation} // Attach the new handler
                      disabled={isFetchingLocation} // Disable checkbox while fetching
                    />
                    <label className="form-check-label" htmlFor="useMyLocation" style={smallLabelStyle}>Use my location</label>
                  </div>
                  {/* <img src="https://i.imgur.com/8O2b4jA.png" alt="Map placeholder" className="ms-auto" style={{width: '90px', borderRadius: '6px'}}/> */}
                </div>
                <div className="mb-1">
                  <label htmlFor="pickupName" className="form-label" style={smallLabelStyle}>Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="pickupName"
                    name="pickupName"
                    value={formData.pickupName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="pickupPhone" className="form-label" style={smallLabelStyle}>Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control form-control-sm" 
                    id="pickupPhone"
                    name="pickupPhone"
                    value={formData.pickupPhone}
                    onChange={handleChange}
                  />
                </div>
                
                <button type="submit" className="btn btn-sm w-100 mt-2" style={{ backgroundColor: '#348c64', color: 'white' }}>
                  Submit Donation
                </button>
              </form>
            </div>

            {/* --- Right Column: Donation Summary (Now Functional) --- */}
            <div className="col-md-5">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#f3f9f9', border: '1px solid #d0e0e0', height: '100%', fontSize: '0.8rem' }}>
                <h5 className="mb-2" style={{color: '#348c64'}}>Donation Summary</h5>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Food Item</span>
                  {/* 3. Display state data instead of static text */}
                  <strong>{formData.foodItemName || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Quantity</span>
                  <strong>{formData.quantity || '...'}</strong>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <span className="text-muted">Number of Meals</span>
                  <strong>{formData.numberOfMeals || '...'}</strong>
                </div> */}
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Veg / Non-Veg</span>
                  <strong>{formData.vegNonVeg}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Prepared On</span>
                  <strong>{formatDate(formData.preparedOn)}</strong>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <span className="text-muted">Expiry / Best Before</span>
                  <strong>{formData.expiry || '...'}</strong>
                </div> */}
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-muted">Address</span>
                  <strong>{formData.address || '...'}</strong>
                </div>
                <div className="d-flex justify-content-between">
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