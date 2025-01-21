"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
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
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleUpdatePet: (petId: string, newPetData: PetEssentials) => Promise<void>;
};
export const PetContext = createContext<PetContext | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, { action, payload }) => {
    switch (action) {
      case "add":
        return [...state, { ...payload, id: Math.random().toString() }];
      case "update":
        return state.map((pet) => {
          if (pet.id === payload.id) {
            return { ...pet, ...payload.newPetData };
          }
          return pet;
        });
      case "delete":
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({
      action: "add",
      payload: newPet,
    });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({
      action: "delete",
      payload: petId,
    });
    await deletePet(petId);
    setSelectedPetId(null);
  };

  const handleUpdatePet = async (petId: string, newPetData: PetEssentials) => {
    setOptimisticPets({
      action: "update",
      payload: { id: petId, newPetData },
    });
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
