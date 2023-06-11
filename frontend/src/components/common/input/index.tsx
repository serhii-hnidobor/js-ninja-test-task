import { ChangeEvent, useId, useState } from 'react';
import clsx from 'clsx';

type Props = {
  value?: string;
  label: string;
  name: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
  type?: 'text' | 'password';
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  readOnly?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  required?: boolean;
};

const Input = ({
  label,
  name,
  placeholder = '',
  type = 'text',
  inputClassName,
  labelClassName,
  wrapperClassName,
  readOnly = false,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  required,
  defaultValue,
}: Props) => {
  const id = useId();
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      return;
    }
    const newValue = e.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <div className={'flex justify-between'}>
        <label className={clsx('mb-[2px] cursor-pointer text-white', labelClassName)} htmlFor={id}>
          <span>{label}</span>
        </label>
      </div>
      <input
        name={name}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        id={id}
        readOnly={readOnly}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={clsx(inputClassName, 'h-[40px] px-4 py-2')}
      />
    </div>
  );
};

export default Input;
