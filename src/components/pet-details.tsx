"use client";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import React from "react";
import PetButton from "./pet-button";

type Props = {
  pet: Pet;
};
const PetDetails = () => {
  const { selectedPet } = usePetContext();
  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <div className="h-full flex justify-center items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <PetInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
};

function EmptyView() {
  return <p className="text-2xl font-medium">No Pet Selected</p>;
}
function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet?.imageUrl}
        alt="Selected Pet Image"
        height={75}
        width={75}
        className="h-[74px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton actionType="checkout" onClick={() => handleCheckoutPet(pet.id)}>
          Checkout
        </PetButton>
      </div>
    </div>
  );
}
function PetInfo({ pet }: Props) {
  return (
    <div className="flex justify-around text-center py-10 px-5">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner name</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {pet?.notes}
    </section>
  );
}

export default PetDetails;
