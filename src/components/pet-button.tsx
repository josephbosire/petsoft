import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
};
const PetButton = ({ actionType, children }: PetButtonProps) => {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return <Button className="secondary">{children}</Button>;
  }
  return <Button>children</Button>;
};

export default PetButton;
