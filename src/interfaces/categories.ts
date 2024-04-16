export type Categories =
  | "Música"
  | "Festa"
  | "Natureza"
  | "Cultura"
  | "Esportes"
  | "Saúde"
  | "";

export const CategoriesOptions: Categories[] = [
  "Música",
  "Festa",
  "Natureza",
  "Cultura",
  "Esportes",
  "Saúde",
];

export enum CategoriesEnum {
  Música = "Música",
  Festa = "Festa",
  Natureza = "Natureza",
  Cultura = "Cultura",
  Esportes = "Esportes",
  Saúde = "Saúde",
}
