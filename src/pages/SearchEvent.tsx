import Page from "../components/Page";
import { useAuth } from "../contexts/Auth.context";
import { CategoriesOptions } from "../interfaces/categories";
import { EventService } from "../services/event";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoadingList from "../components/LoadingList";
import EventList from "../components/e/EventList";
import Event from "../interfaces/Event";
import { useTheme } from "../contexts/Theme.context";
import { useSearchParams } from "react-router-dom";

const SearchEvent = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [searchParams] = useSearchParams();

  const [events, setEvents] = useState<Event[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [term, setTerm] = useState<string>(searchParams.get("term") || "");

  const search = async () => {
    setIsLoading(true);
    searchParams.set("term", term);
    const res = await EventService.searchEvent(
      user.token,
      searchParams.get("term") || " "
    );
    setEvents(res.events);
    setIsLoading(false);
  };

  useEffect(() => {
    searchParams.get("term") && search();
  }, [searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };

  return (
    <Page>
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-prompt">Pesquise Eventos</h1>
        <span className="flex items-center gap-2">
          <h2 className="font-poppins font-medium text-xl">
            Selecionar Categoria
          </h2>
          <select
            name="category"
            id="category"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSelectedCategory(e.target.value);
            }}
            className="bg-lightGray dark:bg-dark px-2 rounded-lg border-[3px] border-purple dark:border-green focus:outline-none font-prompt"
          >
            <option value="all">Todas</option>
            {CategoriesOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </span>
      </div>
      <form
        className="w-full border-4 border-purple dark:border-green rounded-xl font-poppins font-medium"
        onSubmit={handleSearch}
      >
        <input
          value={term}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTerm(e.target.value);
          }}
          type="text"
          className="outline-none bg-white dark:bg-dark w-full h-full p-2 rounded-xl"
          placeholder="Insira o nome do evento"
        />
      </form>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingList />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {selectedCategory !== "all" &&
          events.filter((event) => event.category === selectedCategory)
            .length === 0 ? (
            <>
              <img
                src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                width={768}
                height={512}
                className="object-cover w-full lg:w-[512px]"
              />
              <p className="text-xl font-poppins font-medium">
                Nenhum evento encontrado para a categoria selecionada.
              </p>
            </>
          ) : (
            <>
              {events.length === 0 ? (
                <>
                  <img
                    src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                    width={768}
                    height={512}
                    className="object-cover w-full lg:w-[512px]"
                  />
                  <p className="text-xl font-poppins font-medium">
                    Nenhum evento encontrado.
                  </p>
                </>
              ) : (
                <EventList
                  events={
                    selectedCategory === "all"
                      ? events
                      : events.filter(
                          (event) => event.category === selectedCategory
                        )
                  }
                />
              )}
            </>
          )}
        </div>
      )}
    </Page>
  );
};

export default SearchEvent;
