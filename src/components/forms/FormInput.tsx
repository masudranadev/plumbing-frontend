"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  type?: string;
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
  readonly?: boolean;
}
const FormInput = ({
  name,
  type,
  value,
  placeholder,
  label,
  id,
  className,
  readonly
}: IInput) => {
  const { control, formState: errors } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            className={className}
            id={id}
            {...field}
            value={value ? value : field.value}
            readOnly={readonly}
            required
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormInput;
