import { useEffect } from "react";
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
  className?: string;
  value?: string | string[] | undefined;
};

const SelectFormField = ({
  name,
  placeholder = "select",
  options,
  label,
  id,
  value,
  className,
}: SelectFieldProps) => {
  const { control, reset } = useFormContext();
  useEffect(() => {
    reset({ [name]: "" });
  }, [name, reset]);

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
        name={name} // Specify the name only here
        render={({ field }) => (
          <select className={className} required {...field}>
            <option value="">{placeholder}</option>
            {options?.map((option, index) => (
              <option value={option?.value} key={index}>
                {option?.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectFormField;
