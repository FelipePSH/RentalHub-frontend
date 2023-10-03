import React from 'react';

interface bedroom { 
  id: number;
  name: string;
  description: string;
  vacancy: number;
  residents: number;
}

interface bedroomCardProps {
  bedroom: bedroom;
  handlebedroomClick: (id: number) => void;
}

const BedroomCard: React.FC<bedroomCardProps> = ({ bedroom, handlebedroomClick }) => {
  return (
    <div
      key={bedroom.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg border-1"
      onClick={() => handlebedroomClick(bedroom.id)}
    >
      <img
        className='rounded-md'
        src="https://www.homeishighpointe.com/corporate/uploads/SparkModelBedroom.jpg"
        alt=""
      />
      <hr />
      <h2 className="text-xl font-semibold mb-2">{bedroom.name}</h2>
      
    </div>
  );
};

export default BedroomCard;