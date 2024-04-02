import { UploadCloud } from "lucide-react";
import { useState } from "react";

import Modal from "../Modal";
import { uploadImage } from "../../api/uploadImage";
import { createEvent } from "../../api/Events";
import { useAuth } from "../../contexts/Auth.context";
import { useError } from "../../contexts/Error.context";
import Loading from "../Loading";

interface Props {
  cancel: () => void;
  onCreateEventSuccess: () => void;
}

const CreateEventForm = ({ cancel, onCreateEventSuccess }: Props) => {
  const { user } = useAuth();

  const { setError } = useError();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    participantLimit: "",
    age_range: "",
    location: "",
    date: "",
    imageUrl: imageUrl,
    category: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let fieldValue = value;

    if (name === "name") {
      fieldValue = fieldValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    if (name === "age_range") {
      fieldValue = fieldValue.replace(/\D/g, "");

      if (fieldValue.length > 2) {
        fieldValue = fieldValue.slice(0, 2);
      }

      const rangeValue = parseInt(fieldValue);
      if (isNaN(rangeValue)) {
        fieldValue = "";
      } else {
        fieldValue = rangeValue.toString();
      }
    }

    if (name === "date") {
      if (fieldValue.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(fieldValue)) {
        setError("O formato de data precisa ser: AAAA-MM-DD");
      }
    }

    if (name === "participantLimit") {
      fieldValue = fieldValue.replace(/\D/g, "");

      if (fieldValue.length > 2) {
        fieldValue = fieldValue.slice(0, 3);
      }

      const limitValue = parseInt(fieldValue);
      if (isNaN(limitValue)) {
        fieldValue = "";
      } else {
        fieldValue = limitValue.toString();
      }
    }

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("por favor selecione uma imagem");
      setSelectedFile(null);
    } else if (file) {
      setSelectedFile(file);
    }
  };

  const submit = async () => {
    if (
      !selectedFile ||
      !formData.name ||
      !formData.description ||
      !formData.age_range ||
      !formData.location ||
      !formData.participantLimit ||
      !formData.date ||
      !formData.category
    ) {
      setError("preencha todos os campos");
      return;
    }

    const dateObj = new Date(formData.date);
    if (isNaN(dateObj.getTime())) {
      setError("Data inválida");
      return;
    }

    const now = new Date();
    if (dateObj < now) {
      setError("Eventos ainda não podem ser criados no passado");
      return;
    }

    const parsedParticipantLimit = parseInt(formData.participantLimit);

    if (isNaN(parsedParticipantLimit)) {
      setError("Limite de participantes inválido");
      return;
    }

    const parsedAgeRange = parseInt(formData.age_range);

    if (isNaN(parsedAgeRange)) {
      setError("Limite de idade inválido");
      return;
    }

    if (selectedFile) {
      setIsLoading(true);

      if (selectedFile.size > 3 * 2000 * 2000) {
        setIsLoading(false);
        setSelectedFile(null);
        return;
      }

      await uploadImage(
        selectedFile,
        512,
        256,
        `${user.id}-${formData.date}-${formData.name}`
      )
        .then((imageUrl) => {
          setImageUrl(imageUrl);
          createEvent(
            user.token,
            user.id,
            formData.name,
            formData.description,
            formData.location,
            formData.date,
            parsedAgeRange,
            imageUrl,
            parsedParticipantLimit,
            formData.category,
            { setError }
          );
        })
        .then(() => onCreateEventSuccess())
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Modal
      handleCancel={cancel}
      handleConfirm={submit}
      cancelMessage="Cancelar"
      confirmMessage="Criar evento"
      title="Criar Evento"
    >
      <form className="hidden">
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleUpload(e)}
        />
      </form>
      <form className="flex flex-col gap-3 py-3">
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                  <UploadCloud
                    size={32}
                    className="text-purple dark:text-green"
                  />
                  <h1>Selecionar Imagem</h1>
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Título:</label>
              <input
                autoComplete="off"
                type="text"
                className="form"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Descrição:</label>
              <textarea
                className="p-3 border-[3px] rounded-xl border-purple dark:border-green bg-transparent focus:outline-none resize-none font-prompt"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="participantLimit">
                  Limite de Participantes:
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  className="form"
                  name="participantLimit"
                  value={formData.participantLimit}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="age_range">Idade Mínima:</label>
                <input
                  value={formData.age_range}
                  autoComplete="off"
                  type="number"
                  className="form"
                  name="age_range"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="location">Localização:</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date">Data:</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form"
                  name="date"
                  placeholder={`2024-MM-DD`}
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Categoria:</label>
              <input
                autoComplete="off"
                type="text"
                className="form"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};

export default CreateEventForm;
