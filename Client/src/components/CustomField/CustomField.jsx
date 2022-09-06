import React from "react";
import { useField } from "formik";
import "./CustomField.scss";

function CustomField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form-container">
      <label htmlFor="text">{label}</label>
      <input
        className={meta.touched && meta.error ? "invalid" : ""}
        {...field}
        {...props}
        placeholder={label}
      />
      {meta.touched && meta.error ? (
        <span className="span-error">{meta.error}</span>
      ) : null}
    </div>
  );
}

export default CustomField;
