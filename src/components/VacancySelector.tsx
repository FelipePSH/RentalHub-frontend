import React, { useState } from "react";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";
import { FormLabel } from "@chakra-ui/react";


interface VacancySelectorProps {
  minVacancy: number;
  onVacancyChange: (vacancy: number) => void;
}

const VacancySelector: React.FC<VacancySelectorProps> = ({
  minVacancy,
  onVacancyChange,
}) => {
  const [vacancy, setVacancy] = useState(minVacancy);

  const increaseVacancy = () => {
    const newVacancy = vacancy + 1;
    setVacancy(newVacancy);
    onVacancyChange(newVacancy);
  };

  const decreaseVacancy = () => {
    if (vacancy > minVacancy) {
      const newVacancy = vacancy - 1;
      setVacancy(newVacancy);
      onVacancyChange(newVacancy);
    }
  };

  return (
    <div>
      <FormLabel htmlFor='vacancy'>Vacancy: {vacancy}</FormLabel>
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
    </div>

    </div>
    
  );
};

export default VacancySelector;
