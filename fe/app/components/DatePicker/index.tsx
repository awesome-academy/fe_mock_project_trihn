'use client';
import {
  Controller,
  Control,
  FieldError,
  Path,
  FieldValues,
} from 'react-hook-form';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';
import { FormatDate } from '@/app/utils/enum';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  error?: FieldError;
  showTimeSelect?: boolean;
  dateFormat?: string;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
};

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  error,
  showTimeSelect = false,
  dateFormat = FormatDate.ISO_DATE,
  placeholder,
  className,
  minDate,
  maxDate,
}: Props<T>): JSX.Element => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="label mb-[2px] block">
          <span className="label-text">{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactDatePicker
              id={name}
              selected={field.value ?? null}
              onChange={(date: Date) => field.onChange(date)}
              showTimeSelect={showTimeSelect}
              dateFormat={dateFormat}
              timeFormat="HH:mm"
              timeIntervals={30}
              placeholderText={placeholder}
              className={classNames(
                'input input-bordered w-full focus:outline-none focus:border-gray-100 focus:ring focus:ring-100 pr-10',
                { 'border-red-500 focus:ring-red-300': !!error },
                className,
              )}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              minDate={minDate}
              maxDate={maxDate}
              portalId="datepicker-portal"
              popperClassName="!z-[1000]"
              wrapperClassName="w-full"
            />
          )}
        />
        <div className="absolute right-3 z-10 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <Calendar size={16} />
        </div>
      </div>
      {error && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default DatePicker;
