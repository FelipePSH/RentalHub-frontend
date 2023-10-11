import React, { FC, ChangeEvent } from 'react';

interface SelectUnderlineProps {
  name: string;
  options: string[];
  value: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectUnderline: FC<SelectUnderlineProps> = ({ name, options, value, onChange }) => {
  return (
    <label className="block">
      <span className="text-gray-700">{name}</span>
      <select onChange={onChange} value={value} className="block w-full mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blaze-orange-600 text-cod-gray-700">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectUnderline;
