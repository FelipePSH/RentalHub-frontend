import React from 'react';

interface Apartment {
  id: number;
  name: string;
  description: string;
  address: Address;
  bedrooms: number;
  valueRent: number;
}

interface ApartmentCardProps {
  apartment: Apartment;
  handleApartmentClick: (id: number) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, handleApartmentClick }) => {
  return (
    <div
      key={apartment.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg border-1"
      onClick={() => handleApartmentClick(apartment.id)}
    >
      <img
        src="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?cs=srgb&dl=pexels-sevenstorm-juhaszimrus-439391.jpg&fm=jpg"
        alt=""
      />
      <hr />
      <h2 className="text-xl font-semibold mb-2">{apartment.name}</h2>
      <p className="text-gray-600 mt-2">
        {apartment.address.street}, {apartment.address.city}
      </p>
    </div>
  );
};

export default ApartmentCard;