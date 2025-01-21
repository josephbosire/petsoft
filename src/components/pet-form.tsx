import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet, editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { usePetContext } from "@/lib/hooks";
import { DEFAULT_PET_IMAGE_URL } from "@/lib/const";

type PetFormProps = {
  actionType: "edit" | "add";
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleUpdatePet } = usePetContext();
  return (
    <form
      action={async (formData) => {
        onFormSubmission();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: (formData.get("imageUrl") as string) || DEFAULT_PET_IMAGE_URL,
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };
        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleUpdatePet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
};

export default PetForm;
