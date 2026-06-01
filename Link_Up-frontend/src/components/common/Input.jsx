import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}

      <div className="input-wrapper">
        {icon && <span>{icon}</span>}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;