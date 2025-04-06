import React from 'react';
import './InputField.css';

const InputField = ({ type = 'text', placeholder, value, onChange, label }) => {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;