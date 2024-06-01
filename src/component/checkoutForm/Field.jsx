import React from "react";

const Field = ({ label, id, type, defaultValue, required, autoComplete, value, onChange }) => {
  console.log(defaultValue);
  return (
    <div className="FormRow">
      <label htmlFor={id} className="FormRowLabel">
        {label}
      </label>
      <input
        className="FormRowInput"
        id={id}
        type={type}
        defaultValue={defaultValue}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Field;
