import React from "react";

function FormContainer({ value, placeholder, type }) {
  return (
    <div className="form-container">
      <label htmlFor="text">{placeholder}</label>
      <Field
        type={type}
        id={value}
        name={value}
        component={CustomField}
        placeholder={placeholder}
      />
      <ErrorMessage className="span-error" component="span" name={value} />
    </div>
  );
}

export default FormContainer;
