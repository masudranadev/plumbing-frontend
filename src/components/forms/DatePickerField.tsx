import React from "react";
import ReactDatePicker from "react-datepicker"; // Import the DatePicker from 'react-datepicker' with a different name
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

interface DatePickerFieldProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string | undefined;
}

const DatePickerField = ({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  className,
}: DatePickerFieldProps) => {
  return (
    <ReactDatePicker
      className={className}
      selected={selectedDate}
      dateFormat="PP"
      onChange={onChange}
      minDate={minDate || new Date()}
      maxDate={maxDate || addDays(new Date(), 30)}
    />
  );
};

export default DatePickerField;
