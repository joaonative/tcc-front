import { useState } from "react";
import debounce from "lodash/debounce";

interface Props {
  onMapUrlChange: any;
  onSelectedAddressChange: any;
}

const SearchLocation = ({ onMapUrlChange, onSelectedAddressChange }: Props) => {
  const [results, setResults] = useState<
    [{ address: string; cep: string; mapUrl: string }] | null
  >();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = debounce(async (term: string) => {
    console.log("buscando");
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${term},+Indaiatuba`
    );
    const data = await res.json();
    if (!data) {
      setResults(null);
      return;
    }
    const dataResults = data.map(
      (item: { display_name: string; lat: number; lon: number }) => {
        const adMatch = /^(.*?),\s*Indaiatuba/.exec(item.display_name);
        const address = adMatch ? adMatch[1] : "";

        const cepMatch = /\b\d{5}-\d{3}\b/.exec(item.display_name);
        const cep = cepMatch ? cepMatch[0] : "";

        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${item.lon}%2C${item.lat}%2C${item.lon}%2C${item.lat}&layer=mapnik`;
        return { address, cep, mapUrl };
      }
    );
    setResults(dataResults);
    console.log("parei");
  }, 400);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setResults(null);
    if (event.target.value.length < 2) {
      return;
    }
    debouncedSearch(event.target.value);
  };

  const handleAddressSelection = (result: {
    address: string;
    cep: string;
    mapUrl: string;
  }) => {
    onSelectedAddressChange(result.address);
    onMapUrlChange(result.mapUrl);
    setSearchTerm("");
    setResults(null);
  };

  return (
    <div className="flex flex-col items-center relative w-full">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="address"> Endereço</label>

        <input
          name="address"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="form"
        />
      </div>

      {results && (
        <div className="w-full flex flex-col gap-1 items-center max-h-20 overflow-y-scroll absolute top-20 z-50 bg-white dark:bg-darkBg">
          {results.map(
            (
              result: { address: string; cep: string; mapUrl: string },
              index: number
            ) => (
              <span
                onClick={() => handleAddressSelection(result)}
                key={result.cep + index}
                className="cursor-pointer hover:bg-blue-600"
              >
                <h2 className="font-poppins font-medium">
                  {result.address.length > 24
                    ? `${result.address.substring(0, 24)}...`
                    : result.address}
                </h2>
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
