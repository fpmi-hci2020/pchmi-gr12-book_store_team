import React from "react";

const input = ({ placeholder, value, onChange, type, label, withoutLabel }) => {
  return (
    <>
      {!withoutLabel && <p className="input_label">{label}</p>}
      <input
        className={`input input_${type}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default input;
