import React, { useState, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import InputUnderline from "@/components/forms/InputUnderline";
import { useRouter } from "next/router";
import { EditIcon } from "@/components/icons/index";
import SelectUnderline from "@/components/forms/SelectUnderline";

interface Address {
  country: string;
  city: string;
  stateOrProvince: string;
  street: string;
  district: string;
  zipCode: string;
}

interface ApartmentForm {
  name: string;
  description: string;
  valueRent: number;
  address: Address;
  ourDueDate: string;
  paymentFrequency: string;
}

const AddApartmentForm: React.FC = () => {
  const eventTypes = ['WEEKLY', 'BIWEEKLY', 'MONTHLY'];
  const [formData, setFormData] = useState<ApartmentForm>({
    name: "New Apartment",
    description: "",
    valueRent: 3000,
    address: {
      country: "Australia",
      city: "Melbourne",
      stateOrProvince: "Victoria",
      street: "",
      zipCode: "",
      district: ""
    },
    ourDueDate: "",
    paymentFrequency: "MONTHLY",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(formData.name);

  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/apartments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Se o envio for bem-sucedido, redirecione para a página de detalhes do apartamento
        const data = await response.json();
        push(`/apartments/${data.id}`);
      } else {
        // Se houver um erro no envio do formulário, você pode tratar o erro aqui
        console.error("Erro ao enviar o formulário:", response.statusText);
      }
    } catch (error) {
      // Trate qualquer erro de rede ou outra exceção aqui
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSaveClick = () => {
    setFormData({ ...formData, name: editedName });
    setIsEditing(false);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4">
        <h1
          className="text-3xl mb-4 font-bold flex items-center cursor-pointer"
          onClick={handleEditClick}
        >
          {isEditing ? (
            <InputUnderline
              type="text"
              value={editedName}
              onChange={handleInputChange}
              onBlur={handleSaveClick}
              autoFocus
              isRequired={true}
            />
          ) : (
            <>
              <span style={{ marginRight: "8px" }}>{formData.name}</span>
              <EditIcon className="flex-end" />
            </>
          )}
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-2">
          <InputUnderline
            labelName="Description"
            type="text"
            isRequired={true}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          </div>
          
        </div>


        <h2 className="text-1xl mb-4 mt-10 font-bold">Rent</h2>

        <div className="grid grid-cols-4 gap-4">
        <InputUnderline
            labelName="Our rent"
            type="number"
            isRequired={true}
            value={formData.valueRent}
            onChange={(e) =>
              setFormData({ ...formData, valueRent: e.target.valueAsNumber })
            }
          />
          
           <InputUnderline
            labelName="First due date"
            type="date"
            isRequired={true}
            value={formData.ourDueDate}
            onChange={(e) =>
              setFormData({ ...formData, ourDueDate: e.target.value })
            }
          />

          <SelectUnderline
            name="Payment frequency"
            options={eventTypes}
            value={formData.paymentFrequency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, paymentFrequency: e.target.value })}
          />

        </div>

        <h2 className="text-1xl mb-4 mt-10 font-bold">Address</h2>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
          <InputUnderline
            labelName="Street"
            type="text"
            isRequired={true}
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
          </div>
          
          <div className="col-span-2 ">
            <InputUnderline
              labelName="District"
              type="text"
              isRequired={true}
              value={formData.address.district}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, district: e.target.value },
                })
              }
            />
          </div>

          <InputUnderline
            labelName="Zipcode"
            type="number"
            isRequired={true}
            maxLength={5}
            value={formData.address.zipCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, zipCode: e.target.value },
              })
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          <InputUnderline
            labelName="City"
            type="text"
            isRequired={true}
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
          />
          
          
          
            <InputUnderline
              labelName="State or Province"
              type="text"
              isRequired={true}
              value={formData.address.stateOrProvince}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, stateOrProvince: e.target.value },
                })
              }
            />
       

          <InputUnderline
            labelName="Country"
            type="text"
            isRequired={true}
            value={formData.address.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, country: e.target.value },
              })
            }
          />
          
        </div>  

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blaze-orange-500 hover:bg-blaze-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddApartmentForm;
