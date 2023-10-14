import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
  id?: string;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  className,
  id,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col w-full`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            placeholder={placeholder}
            className={className}
            {...field}
            value={value ? value : field.value}
            rows={rows}
            required
          ></textarea>
        )}
      />
    </div>
  );
};

export default FormTextArea;
