import { useEffect, useState } from "react";
import EventList from "../components/events/EventList";
import Section from "../components/Section";
import Event from "../interfaces/event";
import { getEvents } from "../api/events";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Upload } from "lucide-react";
import { ariaLabel } from "../constants/accessibility";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [age_range, setAgeRange] = useState<string>("");
  const [participantLimit, setParticipantLimit] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
        setIsLoading(false);
      } catch (err) {}
    };
    fetch();
  }, []);

  return (
    <>
      <Section title="">
        <div className="flex items-center justify-between py-4">
          <h1 className="font-prompt text-2xl lg:text-3xl">Eventos Ativos</h1>
          <Button variant="primary" onClick={handleOpen}>
            Criar evento
          </Button>
        </div>
        {isLoading ? <LoadingSkeleton /> : <EventList events={events} />}
      </Section>
      {isOpen && (
        <Modal
          title="Criar evento"
          handleConfirm={() => console.log("criou")}
          confirmMessage="Criar Evento"
          cancelMessage="Cancelar"
          handleCancel={handleClose}
        >
          <form className="flex flex-col gap-2 py-2">
            <input
              id="image"
              className="hidden"
              type="file"
              name="image"
              onChange={(e) => {
                handleUpload(e);
              }}
            />
            <div className="flex justify-center border-[3px] border-purple dark:border-green rounded-xl">
              {selectedFile ? (
                <>
                  {selectedFile.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  )}
                </>
              ) : (
                <label
                  htmlFor="image"
                  className="p-8 flex flex-col items-center gap-5"
                >
                  <Upload
                    size={24}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.upload}
                  />
                  <p className="text-base font-poppins">Selecionar Imagem</p>
                </label>
              )}
            </div>
            {selectedFile && selectedFile.type.startsWith("image/") && (
              <p className="text-xl font-prompt">{selectedFile.name}</p>
            )}
            <div className="flex items-center gap-2">
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form"
                />
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="category">Categoria:</label>
                <select
                  name="category"
                  className="bg-lightGray dark:bg-dark outline-purple dark:outline-green border-purple dark:border-green px-2 border-[3px] rounded-xl p-3"
                >
                  <option value=""></option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Descrição:</label>
              <textarea
                name=""
                id=""
                className="bg-lightGray dark:bg-dark p-2 resize-none border-[3px] border-purple dark:border-green rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="location">Localização:</label>
                <input
                  type="text"
                  name="locaton"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date">Data:</label>
                <input
                  type="text"
                  placeholder="DD/MM/AA"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="age_range">Limite de idade:</label>
                <input
                  type="number"
                  name="age_range"
                  value={age_range}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="form"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="participantLimit">
                  Limite de participantes:
                </label>
                <input
                  type="number"
                  name="participantLimit"
                  value={participantLimit}
                  onChange={(e) => setParticipantLimit(e.target.value)}
                  className="form"
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
