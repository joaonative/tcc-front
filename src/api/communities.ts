import Community from "../interfaces/community";

const mockedCommunities: Community[] = [
  {
    id: "645",
    title: "Comunidade Teste",
    description:
      "Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste",
    participantLimit: 50,
    participantCount: 30,
    imageUrl: "/imagePlaceholder.png",
    owner: "Organização Verão Divertido",
    category: "Festa",
    age: "Livre",
    location: "Praia do Sol, Rio de Janeiro, RJ",
  },
  {
    id: "124412",
    title: "Comunidade Teste 2",
    description:
      "Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste",
    participantLimit: 50,
    participantCount: 30,
    imageUrl: "/imagePlaceholder.png",
    owner: "Organização Verão Divertido",
    category: "Natureza",
    age: "Livre",
    location: "Praia do Sol, Rio de Janeiro, RJ",
  },
  {
    id: "1231231412412421",
    title: "Comunidade Teste 3",
    description:
      "Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste Venha se divertir em nossa comunidade teste",
    participantLimit: 50,
    participantCount: 30,
    imageUrl: "/imagePlaceholder.png",
    owner: "Organização Verão Divertido",
    category: "Artes",
    age: "Livre",
    location: "Praia do Sol, Rio de Janeiro, RJ",
  },
];

export async function getCommunities() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockedCommunities;
}
