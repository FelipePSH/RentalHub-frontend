import 'tailwindcss/tailwind.css';
import AddApartmentButton from '../../components/AddApartmentButton'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApartmentCard from '../../components/ApartmentCard';

interface ApartmentProps {
  id: number;
  name: string;
  description: string;
  address: Address;
  bedrooms: number;
  valueRent: number;
}

export default function Apartments() {
  const { push } = useRouter();
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);

  const handleApartmentClick = (apartmentId: number) => {
    push(`/ApartmentDetail/${apartmentId}`);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/apartments/list')
      .then((response) => response.json())
      .then((data) => setApartments(data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">All Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AddApartmentButton />
        {apartments.map((apartment) => (
          <ApartmentCard 
          key={apartment.id}
          apartment={apartment}
          handleApartmentClick={handleApartmentClick}
          />    
        ))}
      </div>
    </div>
  );
}
