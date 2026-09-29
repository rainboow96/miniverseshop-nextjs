import React from "react";
import { errorClass, inputClass, labelClass } from "./styles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
}

export function FormInput({
  id,
  label,
  required,
  optional,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="text-right">
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-[10px] text-gray-400 font-normal"> (اختیاری)</span>}
      </label>
      <input
        id={id}
        {...props}
        className={`${inputClass(Boolean(error))} ${className}`}
      />
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: { label: string; value: string }[];
  placeholderOption?: string;
}

export function FormSelect({
  id,
  label,
  required,
  error,
  options,
  placeholderOption,
  ...props
}: FormSelectProps) {
  return (
    <div className="text-right">
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        {...props}
        className={inputClass(Boolean(error))}
      >
        {placeholderOption && <option value="">{placeholderOption}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}
