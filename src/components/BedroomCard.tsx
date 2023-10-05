import React from "react";

interface BedroomModel {
  id: number;
  name: string;
  description?: string | null;
  vacancy?: number | 2;
  residents: number;
}

interface BedroomCardProps {
  bedroom: BedroomModel;
  handleBedroomClick: (id: number) => void;
}

const BedroomCard: React.FC<BedroomCardProps> = ({
  bedroom,
  handleBedroomClick,
}) => {
  return (
    <div
      key={bedroom.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg border-1"
      onClick={() => handleBedroomClick && handleBedroomClick(bedroom.id)}
    >
      <img
        className="rounded-md"
        src="https://www.homeishighpointe.com/corporate/uploads/SparkModelBedroom.jpg"
        alt=""
      />
      <hr />
      <h2 className="text-xl font-semibold mb-2">{bedroom.name}</h2>
    </div>
  );
};

export default BedroomCard;
