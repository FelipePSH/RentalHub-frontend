import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import InputUnderline from "@/components/forms/InputUnderline";
import Layout from "@/components/Layout";
import { EditIcon } from "@/components/icons";
import VacancySelector from "@/components/VacancySelector";

interface AddBedroomProps {
  name: string;
  description?: string | null;
  vacancy?: number | 1;
  residents: Resident[];
}

const AddBedroom: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<AddBedroomProps>({
    name: "New Bedroom",
    description: "",
    residents: [],
    vacancy: 2,
  });

  const handleVacancyChange = (newVacancy: number) => {
    setFormData({ ...formData, vacancy: newVacancy }); // Atualize o estado com o novo número de vagas
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(formData.name);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(id)
    try {
      const response = await fetch(
        `http://localhost:8080/api/apartments/bedroom/${id}`,
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Redirecionar de volta para a página de detalhes do apartamento após criar o quarto
        router.push(`/apartments/${id}`);
      } else {
        console.error("Erro ao criar o quarto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar o quarto:", error);
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

        <div className="grid grid-cols-2 gap-4">
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
          <div>
          <VacancySelector minVacancy={1} onVacancyChange={handleVacancyChange} />
          </div>
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

export default AddBedroom;
