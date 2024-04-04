import React, { useState } from "react";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addressList, setAddressList] = useState<[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${searchTerm},+Indaiatuba`
    );
    const data = await response.json();
    console.log("res", data);
    const newList = data.map((item: any) => {
      console.log(item);
      const displayName = item.display_name;

      const enderecoRegex = /^(.*?),\s*Indaiatuba/;
      const enderecoMatch = enderecoRegex.exec(displayName);
      const ADDRESS = enderecoMatch ? enderecoMatch[1] : "";

      const cepRegex = /\b\d{5}-\d{3}\b/;
      const cepMatch = cepRegex.exec(displayName);
      const CEP = cepMatch ? cepMatch[0] : "";

      const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${item.lon}%2C${item.lat}%2C${item.lon}%2C${item.lat}&layer=mapnik`;

      return { address: ADDRESS, cep: CEP, mapUrl };
    });

    setAddressList(newList);
    console.log("lista", addressList);
  };

  return (
    <div className="p-3 bg-lightGray dark:bg-dark border-[3px] border-purple dark:border-green rounded-lg w-1/2 focus:outline-none">
      {isOpen && (
        <ul className="flex flex-col">
          <li>
            <input
              className="w-full bg-dark hover:bg-green"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Rua, Bairro, Cidade"
            />
          </li>
          <li className="w-full">Rua Teste teste</li>
          {addressList.map((item: { address: string; cep: string }) => (
            <li key={item.cep}>{item.address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
