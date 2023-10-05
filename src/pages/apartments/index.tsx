import 'tailwindcss/tailwind.css';
import AddItemButton from '../../components/AddItemButton'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApartmentCard from '../../components/ApartmentCard';
import Layout from '@/components/Layout';

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
    push(`/apartments/${apartmentId}`);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/apartments/list')
      .then((response) => response.json())
      .then((data) => setApartments(data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);


  const svgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-violet-800"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );

  return (
    <Layout>
    <div className=" mx-auto mt-10 py-12 bg-white rounded-lg shadow-xl p-4 hover:shadow-lg border-1 ml-0 sm:ml-64">
      <h1 className="text-3xl mb-4">All Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AddItemButton icon={svgIcon} text="New Apartment" link="/apartments/addApartment" />
        {apartments.map((apartment) => (
          <ApartmentCard 
          key={apartment.id}
          apartment={apartment}
          handleApartmentClick={handleApartmentClick}
          />    
        ))}
      </div>
    </div>
  </Layout>
  );
}
