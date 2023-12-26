import { Modal } from "@/components/Modal";
import { useTranslation } from "next-i18next";
import { RiCloseLine } from "react-icons/ri";

type APIKeyModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  apiKey: string;
};

export const APIKeyModal: React.FC<APIKeyModalProps> = ({
  isModalOpen,
  onClose,
  apiKey,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.keysList" });

  return (
    <Modal isOpen={isModalOpen} className="rounded-lg">
      <div className="p-6 space-y-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{t("apiKey")}</h2>
          <RiCloseLine onClick={onClose} className="h-6 w-6 cursor-pointer" />
        </div>
        <p className="text-lg mb-4">{apiKey}</p>
        <p className="text-sm text-gray-500">{t("apiKeySaveMessage")}</p>
      </div>
    </Modal>
  );
};
