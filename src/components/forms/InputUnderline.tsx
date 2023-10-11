import React, { ChangeEvent, FocusEvent } from 'react';

type InputUnderlineProps = {
  labelName?: string;
  placeholder?: string;
  type: string;
  isRequired: boolean;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  maxLength?: number; 
};

const InputUnderline: React.FC<InputUnderlineProps> = ({
  labelName,
  placeholder,
  type,
  isRequired,
  value,
  onChange,
  onBlur,
  autoFocus,
  maxLength,
}) => {
  return (
    <label className="block">
      <span className=" text-gray-700 ">{labelName || ''}</span>
      <input
        type={type}
        placeholder={placeholder || ''}
        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blaze-orange-600 text-cod-gray-700"
        required={isRequired}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        maxLength={maxLength}
      />
    </label>
  );
};

export default InputUnderline;
