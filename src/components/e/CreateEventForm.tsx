import { UploadCloud } from "lucide-react";
import { useState } from "react";

import { uploadImage } from "../../api/uploadImage";
import { useAuth } from "../../contexts/Auth.context";
import { useError } from "../../contexts/Error.context";

const CreateEventForm = () => {
  const { user } = useAuth();

  const { setError } = useError();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("por favor selecione uma imagem");
      setSelectedFile(null);
    } else if (file) {
      setSelectedFile(file);
    }
  };

  const createEvent = () => {
    if (selectedFile) {
      setIsUploading(true);

      if (selectedFile.size > 3 * 1024 * 1024) {
        setIsUploading(false);
        return;
      }

      if (selectedFile.type.startsWith("image/")) {
        setIsUploading(false);
        setError("Por favor, selecione uma imagem");
        setSelectedFile(null);
      }

      uploadImage(selectedFile, 512, 256, user.id).then((imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };
  return (
    <>
      <form className="hidden">
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleUpload(e)}
        />
      </form>
      <form className="flex flex-col gap-3 py-3">
        <div className="flex justify-center border-[3px] rounded-lg border-purple dark:border-green">
          {selectedFile ? (
            selectedFile.type.startsWith("image/") && (
              <img
                width={328}
                height={328}
                src={URL.createObjectURL(selectedFile)}
                alt="pré visualização da imagem do evento"
                className="object-cover w-full h-[256px]"
              />
            )
          ) : (
            <label
              htmlFor="image"
              className="cursor-pointer flex flex-col items-center justify-center h-[256px]"
            >
              <UploadCloud size={32} className="text-purple dark:text-green" />
              <h1>Selecionar Imagem</h1>
            </label>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Título:</label>
          <input autoComplete="off" type="text" className="form" name="name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descrição:</label>
          <textarea
            className="p-3 border-[3px] rounded-xl border-purple dark:border-green bg-transparent focus:outline-none resize-none"
            name="description"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Limite de Participantes:</label>
            <input
              autoComplete="off"
              type="number"
              className="form"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Idade Mínima:</label>
            <input
              autoComplete="off"
              type="number"
              className="form"
              name="name"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Localização:</label>
            <input
              autoComplete="off"
              type="text"
              className="form"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Data:</label>
            <input
              autoComplete="off"
              type="text"
              className="form"
              name="name"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEventForm;
