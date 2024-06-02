import Page from "../components/Page";
import { useAuth } from "../contexts/Auth.context";
import { CategoriesOptions } from "../interfaces/categories";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoadingList from "../components/LoadingList";
import Event from "../interfaces/Event";
import { useTheme } from "../contexts/Theme.context";
import { useSearchParams } from "react-router-dom";
import CommunityList from "../components/c/CommunityList";
import { CommunityService } from "../services/community";

const SearchComm = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [searchParams] = useSearchParams();

  const [communities, setCommunities] = useState<Event[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [term, setTerm] = useState<string>(searchParams.get("term") || "");

  const search = async () => {
    setIsLoading(true);
    searchParams.set("term", term);
    const res = await CommunityService.searchCommunity(
      user.token,
      searchParams.get("term") || " "
    );
    setIsLoading(false);
    setCommunities(res.communities);
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
        <h1 className="text-2xl lg:text-3xl font-prompt">
          Pesquise Comunidades
        </h1>
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
          placeholder="Insira o nome da comunidade"
        />
      </form>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingList />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {selectedCategory !== "all" &&
          communities.filter((comm) => comm.category === selectedCategory)
            .length === 0 ? (
            <>
              <img
                src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                width={768}
                height={512}
                className="object-cover w-full lg:w-[512px]"
              />
              <p className="text-xl font-poppins font-medium">
                Nenhuma comunidade encontrada para a categoria selecionada.
              </p>
            </>
          ) : (
            <>
              {communities.length === 0 ? (
                <>
                  <img
                    src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                    width={768}
                    height={512}
                    className="object-cover w-full lg:w-[512px]"
                  />
                  <p className="text-xl font-poppins font-medium">
                    Nenhuma comunidade encontrada.
                  </p>
                </>
              ) : (
                <CommunityList
                  communities={
                    selectedCategory === "all"
                      ? communities
                      : communities.filter(
                          (comm) => comm.category === selectedCategory
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

export default SearchComm;
