'uses client'
import React, { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import InputUnderline from './InputUnderline';
import BedIcon from '../icons/BedIcon';
import VacancySelector from '../VacancySelector';

interface DrawerBedroomFormProps {
  apartmentId: string | undefined;
}

interface BedroomFormData {
  name: string;
  description?: string | null;
  vacancy?: number | 1;
  residents: Resident[];
}



function DrawerBedroomForm({ apartmentId }: DrawerBedroomFormProps) {
  const { isOpen, onOpen, onClose} = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter();
  const [formData, setFormData] = useState<BedroomFormData>({
    name: "New Bedroom",
    description: "",
    residents: [],
    vacancy: 1,
  });

  const handleVacancyChange = (newVacancy: number) => {
    setFormData({ ...formData, vacancy: newVacancy }); // Atualize o estado com o novo número de vagas
    console.log(formData.vacancy)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('chamou handle submit');
  
    const success = await createBedroom(apartmentId, formData);
  
    if (success) {
      router.push(`/apartments/${apartmentId}`);
    } else {
      setIsLoading(false);
    }
  };
  

  console.log(formData)
  return (
    <form onSubmit={handleSubmit}>
      <Button leftIcon={<BedIcon />} colorScheme='teal' onClick={onOpen}>
        Create Bedroom
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Create a new bedroom</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                 <InputUnderline
                    labelName='Name'
                    value={formData.name}
                    type="text"
                    onChange={(e) =>
                    setFormData({...formData,name: e.target.value})}
                    autoFocus
                    isRequired={true}
                  />
              </Box>
              <Box>
                 <InputUnderline
                  labelName="Description"
                  type="text"
                  placeholder='ex: Bedroom with bedroom '
                  isRequired={true}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({...formData,description: e.target.value})}
                />
              </Box>
              <Box>
                <VacancySelector minVacancy={1} onVacancyChange={handleVacancyChange}/>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' type='submit' onClick={() => {
                handleSubmit
              }} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}

export default DrawerBedroomForm;



async function createBedroom(apartmentId: string | undefined, formData: BedroomFormData): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:8080/api/apartments/bedroom/${apartmentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return true;
    } else {
      console.error('Erro ao criar o quarto:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Erro ao criar o quarto:', error);
    return false;
  }
}