"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { CreatePet, Pet } from "@/lib/types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

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
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (newPet: CreatePet) => Promise<void>;
  handleUpdatePet: (petId: string, newPetData: CreatePet) => Promise<void>;
};
export const PetContext = createContext<PetContext | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, newPet) => {
    return [...state, { ...newPet, id: Math.random().toString() }];
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (newPet: CreatePet) => {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleCheckoutPet = async (petId: string) => {
    await deletePet(petId);
    setSelectedPetId(null);
  };

  const handleUpdatePet = async (petId: string, newPetData: CreatePet) => {
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleUpdatePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
