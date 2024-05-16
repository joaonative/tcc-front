import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "../../api/api";
import { Categories, CategoriesOptions } from "../../interfaces/categories";
import Modal from "../Modal";
import { useAuth } from "../../contexts/Auth.context";
import { useError } from "../../contexts/Error.context";
import Loading from "../Loading";
import { uploadImage } from "../../api/uploadImage";
import { UploadCloud } from "lucide-react";
import SearchComponent from "../MAPGENERATOR";

interface Props {
  handleCancel: () => void;
  communityId?: string;
}

interface FormData {
  name: string;
  description: string;
  participantLimit: number;
  age_range: number;
  date: string;
  category: Categories;
  imageUrl: string;
  mapUrl: string;
}

const CreateEventForm = ({ handleCancel, communityId }: Props) => {
  const { user } = useAuth();
  const { setError } = useError();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    participantLimit: 0,
    age_range: 0,
    date: "",
    category: "",
    imageUrl: "",
    mapUrl: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name" || name === "description" || name === "location") {
      const fValue = value.replace(/[0-9]/g, "");
      setFormData({
        ...formData,
        [name]: fValue,
      });
    } else if (name === "participantLimit" || name === "age_range") {
      const fValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: fValue,
      });
    } else if (name === "date") {
      const formattedDate = value
        .replace(/[^\d]/g, "")
        .replace(/^(\d{4})(\d{0,2})?(\d{0,2})?/, (match, p1, p2, p3) => {
          return p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ""}` : match;
        });

      setFormData({
        ...formData,
        [name]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [mapUrl, setMapUrl] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    cep: string;
    mapUrl: string;
  } | null>();

  const handleMapUrlChange = (newMapUrl: string) => {
    setMapUrl(newMapUrl);
  };

  const handleSelectedAddressChange = (newSelectedAddress: {
    address: string;
    cep: string;
    mapUrl: string;
  }) => {
    setSelectedAddress(newSelectedAddress);
  };

  const postEvent = async (formData: FormData) => {
    try {
      const response = await axios.post("/events", formData, {
        headers: { Authorization: `Bearer ${user.token}`, id: user.id },
      });
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      handleCancel();
      return;
    }
  };

  const postCommunityEvent = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "/events/community",
        { ...formData, communityId },
        {
          headers: { Authorization: `Bearer ${user.token}`, id: user.id },
        }
      );
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      handleCancel();
      return;
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (eventData: FormData) =>
      communityId ? postCommunityEvent(eventData) : postEvent(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community events" + communityId, "events"],
      });
      handleCancel();
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sumbit = async () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.age_range ||
      !formData.participantLimit ||
      !formData.date ||
      !formData.category ||
      !selectedFile ||
      !mapUrl
    ) {
      setError("preencha todos os campos");
      return;
    }

    if (formData.age_range > user.age) {
      setError("idade inválida");
      return;
    }

    let date = new Date(formData.date);
    let currDate = new Date();

    if (isNaN(date.getTime())) {
      setError("data inválida, siga o formato: AAAA-MM-DD");
      return;
    } else if (date < currDate) {
      setError("data inválida, insira uma data futura");
      return;
    }

    const url = await uploadImage(
      selectedFile,
      768,
      512,
      `${user.id}-${formData.date}-${formData.name.replace(/\s+/g, "")}`
    );
    const eventData = {
      ...formData,
      imageUrl: url,
      mapUrl,
      location: selectedAddress,
    };
    mutation.mutate(eventData);
  };

  if (mutation.isPending) {
    return <Loading />;
  }

  return (
    <Modal
      title="crie seu evento"
      confirmMessage="criar evento"
      cancelMessage="voltar"
      handleConfirm={sumbit}
      handleCancel={handleCancel}
    >
      <form className="hidden">
        <input
          autoComplete="off"
          id="image"
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let file = event.target.files?.[0];
            if (!file) {
              return;
            }
            if (!file.type.startsWith("image/")) {
              setSelectedFile(null);
              setError("selecione apenas arquivos do tipo imagem");
              event.target.value = "";
              return;
            }
            setSelectedFile(file);
          }}
        />
      </form>
      <form className="flex flex-col gap-3 min-w-80 lg:w-[620px] my-5">
        <div className="flex justify-center border-[3px] rounded-lg border-purple dark:border-green">
          {selectedFile && selectedFile.type.startsWith("image/") ? (
            <img
              width={328}
              height={328}
              src={URL.createObjectURL(selectedFile)}
              alt="pré visualização da imagem do evento"
              className="object-cover w-full h-[256px]"
            />
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
        {selectedFile && (
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-medium ">{selectedFile.name}</h2>
            <label htmlFor="image" className="font-prompt">
              Alterar
            </label>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Título</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descrição</label>
          <textarea
            autoComplete="off"
            name="description"
            value={formData.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, description: event.target.value })
            }
            rows={5}
            className="bg-lightGray dark:bg-dark px-3 py-2 rounded-lg border-[3px] border-purple dark:border-green focus:outline-none font-prompt resize-none"
          />
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="participantLimit">Máximo de Participates</label>
            <select
              name="participantLimit"
              className="bg-lightGray dark:bg-dark px-3 py-2 rounded-lg border-[3px] border-purple dark:border-green focus:outline-none font-prompt"
              value={formData.participantLimit}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setFormData({
                  ...formData,
                  participantLimit: parseInt(event.target.value),
                });
              }}
            >
              <option value={""}>Selecionar Limite</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={64}>64</option>
              <option value={128}>128</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="age_range">Idade Mínima</label>
            <input
              autoComplete="off"
              type="number"
              name="age_range"
              value={formData.age_range !== 0 ? formData.age_range : ""}
              onChange={handleInputChange}
              className="form"
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-3">
          {selectedAddress ? (
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <label htmlFor="address"> Endereço</label>
                <h2
                  className="font-poppins"
                  onClick={() => setSelectedAddress(null)}
                >
                  Limpar
                </h2>
              </div>
              <span className="bg-lightGray dark:bg-dark px-3 py-2 rounded-lg border-[3px] border-purple dark:border-green focus:outline-none font-prompt w-full line-clamp-1">
                {JSON.stringify(selectedAddress)}
              </span>
            </div>
          ) : (
            <SearchComponent
              onMapUrlChange={handleMapUrlChange}
              onSelectedAddressChange={handleSelectedAddressChange}
            />
          )}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="date">Data</label>
            <input
              autoComplete="off"
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              maxLength={10}
              className="form"
              placeholder="AAAA-MM-DD"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData({
                ...formData,
                category: event.target.value as Categories,
              });
            }}
            className="bg-lightGray dark:bg-dark px-3 py-2 rounded-lg border-[3px] border-purple dark:border-green focus:outline-none font-prompt"
          >
            <option value="">Selecionar Categoria</option>
            {CategoriesOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEventForm;
