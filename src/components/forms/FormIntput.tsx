"use client";

// import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Controller, useForm, useFormContext } from "react-hook-form";

interface IInput {
  type?: string;
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  className?: string;
}
const FormInput = ({
  name,
  type,
  value,
  placeholder,
  label,
  className,
}: IInput) => {
  const { control, formState: errors } = useForm();

  //   const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      <label
        htmlFor="fullName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            value={value ? value : field.value}
            type={type}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
      {/* <small style={{ color: "red" }}>{errorMessage}</small> */}
    </>
  );
};

export default FormInput;
