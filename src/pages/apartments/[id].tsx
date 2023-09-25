import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function ApartmentDetail() {
  const router = useRouter();
  const [apartmentDetails, setApartmentDetails] = useState([]);
  const id  = router.query.id; 


  useEffect(() => {
    // Faça uma solicitação GET para obter detalhes do apartamento com o ID fornecido
    if (id) {
      fetch(`http://localhost:8080/api/apartments/${router.query.ID}`)
        .then((response) => response.json())
        .then((data) => {
          // Aqui, você pode definir os dados recebidos no estado local para renderizá-los
          setApartmentDetails(data);
        })
        .catch((error) => console.error('Erro ao buscar detalhes do apartamento:', error));
    }
  }, [id]);


  return (
    <div>
    {apartmentDetails ? (
      <>
        <h1>{apartmentDetails.name}</h1>
        <p>{apartmentDetails.description}</p>
        {/* Renderize outros detalhes do apartamento aqui */}
      </>
    ) : (
      <p>Carregando...</p>
    )}
  </div>
  );
};
