import React from "react";
import { FieldHookConfig, useField } from "formik";
import "./CustomField.scss";

interface ICustomFieldProps {
    label: string;
}

function CustomField({
    label,
    ...props
}: ICustomFieldProps & FieldHookConfig<string>) {
    const [field, meta] = useField(props);
    return (
        <div className="form-container">
            <label htmlFor="text">{label}</label>
            <input
                className={meta.touched && meta.error ? "invalid" : ""}
                {...field}
                placeholder={label}
            />
            {meta.touched && meta.error ? (
                <span className="span-error">{meta.error}</span>
            ) : null}
        </div>
    );
}

export default CustomField;
