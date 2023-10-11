import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { copyToClipboard } from "@/utils/CopyToClipboardUtils";
import {formatData} from "@/utils/DateFormatUtils"
import Layout from "@/components/Layout";
import BedroomCard from "@/components/BedroomCard";
import AddItemButton from "@/components/AddItemButton";
import BedIcon from "@/components/icons/BedIcon";

interface ApartmentDetailProps {
  id: number;
  name: string;
  description: string;
  address: Address;
  bedrooms: Bedroom[];
  ourRent: OurRent;
}

export default function ApartmentDetail() {
  const router = useRouter();
  const [apartmentDetails, setApartmentDetails] =
    useState<ApartmentDetailProps | null>(null);
  const id = router.query.id;
  const bedroomsList = apartmentDetails?.bedrooms;

  const calculateVacancy = () => {
    if (apartmentDetails && apartmentDetails.bedrooms) {
      // Use reduce para somar o número de vagas em todos os quartos
      const totalVacancy = apartmentDetails.bedrooms.reduce(
        (total, bedroom) => total + (bedroom.vacancy || 0),
        0
      );
      return totalVacancy;
    }
    return 0; // Retorne 0 se não houver detalhes do apartamento ou quartos
  };

  const nextDueDate = formatData(apartmentDetails?.ourRent.nextPaymentDate?.toString() ?? '');


  const handleCopyClick = () => {
    if (apartmentDetails) {
      const apartmentId = apartmentDetails.id.toString();
      copyToClipboard(apartmentId);
      // Exemplo de feedback após a cópia (você pode personalizar isso)
      alert(`ID ${apartmentId} copiado para a área de transferência!`);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/apartments/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setApartmentDetails(data);
        })
        .catch((error) =>
          console.error("Erro ao buscar detalhes do apartamento:", error)
        );
    }
  }, [id]);

  return (
    <Layout>
      {apartmentDetails ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 place-content-around
            mt-5 ml-5
              
            "
          >
            <div>
              <img
                src="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?cs=srgb&dl=pexels-sevenstorm-juhaszimrus-439391.jpg&fm=jpg"
                alt=""
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-4 place-content-between">
                <h1 className="text-4xl subpixel-antialiased font-semibold  mb-4">
                  {apartmentDetails.name}
                </h1>
                <div
                  className="flex items-center justify-end mb-4 cursor-pointer"
                  onClick={handleCopyClick}
                >
                  <h1 className="text-3xl font-light  text-right">
                    {`#${apartmentDetails.id}`}
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </div>
              </div>
              <div className="grid grid-rows-4 grid-flow-col ">
                <div>
                  <p className="underline decoration-indigo-300">
                    {`${apartmentDetails.address.street}, ${apartmentDetails.address.city} - ${apartmentDetails.address.zipCode}`}
                  </p>
                </div>
                <div className="grid grid-cols-3 mt-2">
                  <div className="grid grid-rows-2">
                    <p className="font-semibold">Our rent</p>
                    <p>{`$${apartmentDetails.ourRent.valueRent}`}</p>
                  </div>
                  <div className="grid grid-rows-2">
                    <p className="font-semibold">Next duedate</p>
                    <p>{`${nextDueDate}`}</p>
                  </div>
                  <div className="grid grid-rows-2">
                    <p className="font-semibold">Status:</p>
                    <p>{`${apartmentDetails.ourRent.paymentStatus}`}</p>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="p-1">
              <p className="font-bold mt-1 mb-5">Description:</p>
              <p className="mt-2">{apartmentDetails.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5">
            <hr className="mt-5" />
            <div className="mt-5 ">
              <h1 className="text-2xl">Bedrooms</h1>
            </div>
            <div className="grid grid-rows-3 content-around mt-5 p-2">
              <div className="grid grid-cols-4 ">
                <AddItemButton  icon={<BedIcon/>} text="New bedroom" link={`/apartments/bedrooms/new?id=${id}`}/>
                {apartmentDetails.bedrooms.map((bedroom, index) => (
                  <div key={index} className="mr-4 mt-4">
                    <BedroomCard bedroom={bedroom} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </Layout>
  );
}
