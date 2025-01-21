import React from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "edit" | "add";
};

const PetFormBtn = ({ actionType }: PetFormBtnProps) => {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Update Pet"}
    </Button>
  );
};

export default PetFormBtn;
