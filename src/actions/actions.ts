"use server";

import prisma from "@/lib/database";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addPet = async (pet: PetEssentials) => {
  await sleep(1000);
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }
  revalidatePath("/app", "layout");
};

export const editPet = async (petId: string, newPetData: PetEssentials) => {
  await sleep(1000);
  try {
    await prisma.pet.update({
      data: newPetData,
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Could not update pet",
    };
  }
  revalidatePath("/app", "layout");
};

export const deletePet = async (petId: string) => {
  await sleep(1000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete pet",
    };
  }
  revalidatePath("/app", "layout");
};
