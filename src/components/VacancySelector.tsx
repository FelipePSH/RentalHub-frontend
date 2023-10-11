import React, { useState } from "react";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";

interface VacancySelectorProps {
  minVacancy: number;
}

const VacancySelector: React.FC<VacancySelectorProps> = ({ minVacancy }) => {
  const [vacancy, setVacancy] = useState(minVacancy);

  const increaseVacancy = () => {
    setVacancy(vacancy + 1);
  };

  const decreaseVacancy = () => {
    if (vacancy > minVacancy) {
      setVacancy(vacancy - 1);
    }
  };

  return (
    <div className="flex items-center mb-5">
      <button
        type="button"
        className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:red-300 font-normal rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-2 dark:bg-red-400 dark:hover:bg-red-600 dark:focus:red-600"
        onClick={decreaseVacancy}
      >
        <MinusIcon />
        Decrease
      </button>

      <button
        type="button"
        className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:green-300 font-small rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-2 dark:bg-green-400 dark:hover:bg-green-600 dark:focus:green-600"
        onClick={increaseVacancy}
      >
        Increase
        <PlusIcon />
      </button>
      <p className="ml-4 text-xl">Vacancy: {vacancy}</p>
    </div>
  );
};

export default VacancySelector;
