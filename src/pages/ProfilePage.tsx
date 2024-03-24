import { Pencil } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";
import { useState } from "react";
import Modal from "../components/Modal";
import { ariaLabel } from "../constants/accessibility";
import { uploadImage } from "../api/uploadImage";

export default function ProfilePage() {
  const { userData, logout, updateImageUrl } = useAuth();

  const [clientError, setClientError] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSelectionCancelled, setIsSelectionCancelled] =
    useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsSelectionCancelled(false);
    }
  };

  const handleCancel = () => {
    setIsSelectionCancelled(true);
  };

  const upload = () => {
    if (selectedFile) {
      setIsUploading(true);

      if (selectedFile.size > 3 * 1024 * 1024) {
        setClientError("grande");
        setIsUploading(false);
        return;
      }

      if (!userData?.id) {
        return;
      }

      uploadImage(selectedFile, 256, 256, userData.id)
        .then((imageUrl) => {
          userData && updateImageUrl(userData.id, imageUrl);
        })
        .catch((error) => {
          setClientError(error);
        });
    }
  };

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
      <Section title="">
        {clientError && (
          <div className="text-center">
            <p className="uppercase text-red-500 font-poppins font-medium">
              {clientError}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-end -space-x-8">
              <img
                src={userData?.imageUrl}
                alt="foto de perfil do usuário"
                width={128}
                height={128}
                className={`${
                  !imageLoaded && "loading-image"
                } object-cover rounded-full border-4 h-32 w-32 border-purple dark:border-green`}
                onLoad={() => setImageLoaded(true)}
              />
              <form onSubmit={upload} className="hidden">
                <input
                  id="pfp"
                  autoComplete="off"
                  type="file"
                  name="pfp"
                  onChange={(e) => {
                    handleUpload(e);
                  }}
                />
              </form>
              <label
                htmlFor="pfp"
                className="cursor-pointer p-3 bg-white dark:bg-dark rounded-full shadow-xl"
              >
                {isUploading ? (
                  <span className="animate-spin" />
                ) : (
                  <Pencil
                    size={20}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.pencil}
                  />
                )}
              </label>
            </div>
            <h1 className="text-4xl">{userData?.name}</h1>
          </div>
          <Button variant="outline" onClick={() => logout()}>
            Sair
          </Button>
        </div>
      </Section>

      {selectedFile && !isSelectionCancelled && (
        <Modal
          title="Pré-visualização"
          handleConfirm={upload}
          confirmMessage="Atualizar"
          handleCancel={handleCancel}
          cancelMessage="Cancelar"
        >
          {selectedFile.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-32 h-32 rounded-full"
            />
          )}
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-prompt max-w-44 truncate overflow-ellipsis">
              {selectedFile.name}
            </p>
            <label htmlFor="pfp" className="cursor-pointer font-prompt">
              Alterar
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}
