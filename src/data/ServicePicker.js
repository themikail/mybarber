import React from "react";

function ServicePicker({ selectedService, handleServiceSelection }) {
  return (
    <div>
      <h2>Select Service</h2>
      <select
        onChange={(e) => handleServiceSelection(e.target.value)}
        value={selectedService}
      >
        <option value="">Select a service</option>
        <option value="Haircut">Haircut</option>
        <option value="Shave">Shave</option>
        <option value="Beard Trim">Beard Trim</option>
        <option value="Sac Sakal">Sac Sakal</option>
      </select>
    </div>
  );
}

export default ServicePicker;
