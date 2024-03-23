import { Pencil } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";
import { useState } from "react";
import { imageDataBase } from "../iParqueConfig";
import Modal from "../components/Modal";
import { ariaLabel } from "../constants/accessibility";

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
      const pfpRef = ref(imageDataBase, `images/${userData?.id}`);

      if (selectedFile.size > 3 * 1024 * 1024) {
        setClientError("grande");
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = function () {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            canvas.width = 256;
            canvas.height = 256;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              async (blob) => {
                if (blob) {
                  const data = await uploadBytes(pfpRef, blob);
                  const downloadUrl = await getDownloadURL(data.ref);
                  const imageUrl = downloadUrl;
                  userData && updateImageUrl(userData.id, imageUrl);
                }
              },
              "image/webp",
              0.8
            );
          }
        };
      };
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
                } object-cover rounded-full border-4 border-purple dark:border-green`}
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
          <p className="text-xl font-prompt">{selectedFile.name}</p>
        </Modal>
      )}
    </>
  );
}
