import Button from "@/components/Button";
import { FC, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

type KeyCardProps = {
  name: string;
  onDelete: () => Promise<void>;
};

const KeyCard: FC<KeyCardProps> = ({ name, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <div className="flex justify-between items-center px-4 border border-gray-200 rounded-lg w-full">
      <div className="text-lg font-bold">{name}</div>
      <Button
        onClick={handleDelete}
        className="rounded flex items-center"
        variant="link"
        size="no-padding"
        loading={isDeleting}
      >
        <RiDeleteBin6Line className="text-error" />
      </Button>
    </div>
  );
};

export default KeyCard;
