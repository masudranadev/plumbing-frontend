"use client";

import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  placeholder?: string;
  label?: string;
  handleChange?: (el: string) => void;
  id?: string;
};

const SelectFormField = ({
  name,
  placeholder = "select",
  options,
  label,
  id,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <div className="form-control w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select name={name} className="select select-bordered">
            <option disabled selected>
              {placeholder}
            </option>
            {options.map((option, index) => (
              <option value={value ? value : onChange} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectFormField;
