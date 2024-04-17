import { Pencil } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../contexts/Auth.context";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { ariaLabel } from "../constants/aria-label";
import { uploadImage } from "../api/uploadImage";
import { updateUser } from "../api/User";
import { useError } from "../contexts/Error.context";

export default function Profile() {
  const { user, setUser, setAuthenticated } = useAuth();
  const { setError } = useError();

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

  const logout = () => {
    window.localStorage.removeItem("user");
    setAuthenticated(false);
  };

  const handleCancel = () => {
    setIsSelectionCancelled(true);
  };

  const upload = () => {
    if (selectedFile) {
      setIsUploading(true);

      if (selectedFile.size > 3 * 1024 * 1024) {
        setIsUploading(false);
        return;
      }

      uploadImage(selectedFile, 256, 256, user.id)
        .then((imageUrl) => {
          const updatedUser = {
            name: user.name,
            email: user.email,
            imageUrl,
            token: user.token,
            phone: user.phone,
            age: user.age,
            id: user.id,
          };
          updateUser(user.token, user.id, updatedUser, { setError, setUser });
        })
        .finally(() => {
          setIsUploading(false);
          handleCancel();
        });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-end -space-x-8">
            <img
              src={user.imageUrl}
              alt="foto de perfil do usuário"
              width={128}
              height={128}
              className="object-cover rounded-full border-4 h-32 w-32 border-purple dark:border-green"
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
          <h1 className="text-4xl">{user.name}</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          Sair
        </Button>
      </div>

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
