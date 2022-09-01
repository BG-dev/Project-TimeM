import React from "react";
import "./CustomField.scss";

function CustomField({ field, form: { touched, errors }, ...props }) {
  return (
    <input
      className={touched[field.name] && errors[field.name] ? "invalid" : ""}
      {...field}
      {...props}
    />
  );
}

export default CustomField;
