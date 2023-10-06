import React, { useState } from 'react';
import Layout from '@/components/Layout';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

interface Address {
  country: string;
  city: string;
  stateOrProvince: string;
  street: string;
  zipCode: string;
}

interface ApartmentForm {
  name: string;
  description: string;
  valueRent: number;
  address: Address;
}

const AddApartmentForm: React.FC = () => {
  const [formData, setFormData] = useState<ApartmentForm>({
    name: '',
    description: '',
    valueRent: 3000.0,
    address: {
      country: '',
      city: '',
      stateOrProvince: '',
      street: '',
      zipCode: '',
    },
  });

  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Enviar formData para o backend
      const response = await fetch('http://localhost:8080/api/apartments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Se o envio for bem-sucedido, redirecione para a página de detalhes do apartamento
        const data = await response.json();
        push(`/apartments/${data.id}`);
      } else {
        // Se houver um erro no envio do formulário, você pode tratar o erro aqui
        console.error('Erro ao enviar o formulário:', response.statusText);
      }
    } catch (error) {
      // Trate qualquer erro de rede ou outra exceção aqui
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <Layout>
        <h1 className="text-3xl mb-4 font-bold">New Apartment</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-700">Apartment Name</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Description</span>
            <textarea
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Rent Value</span>
            <input
              type="number"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.valueRent}
              onChange={(e) => setFormData({ ...formData, valueRent: parseFloat(e.target.value) })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Country</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.address.country}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">City</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.address.city}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">State/Province</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.address.stateOrProvince}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, stateOrProvince: e.target.value } })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Street Address</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.address.street}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Zip Code</span>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.address.zipCode}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })}
              required
            />
          </label>

          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
    </Layout>
  );
};

export default AddApartmentForm;
