"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};
type PetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
};
export const PetContext = createContext<PetContext | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
