import Event from "../interfaces/event";

const mockedEvents: Event[] = [
  {
    id: "645",
    title: "Festa na Praia",
    description:
      "Venha se divertir em nossa festa na praia! Música ao vivo, comida deliciosa e diversão garantida para todas as idades.",
    date: "15/07",
    participantLimit: 50,
    participantCount: 30,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683121629512-e1a92814f0ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D",
    owner: "Organização Verão Divertido",
    category: "Festa",
    age: "Livre",
    location: "Praia do Sol, Rio de Janeiro, RJ",
    time: "Sábado, 15 de julho de 2024 às 14:00 até domingo, 16 de julho de 2024 às 02:00.",
  },
  {
    id: "789",
    title: "Oficina de Pintura",
    description:
      "Aprenda técnicas de pintura em uma atmosfera descontraída e criativa. Não é necessário experiência prévia!",
    date: "22/07",
    participantLimit: 20,
    participantCount: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
    owner: "Atelier Arte Viva",
    category: "Artes",
    age: "Livre",
    location: "Rua das Artes, 123, São Paulo, SP",
    time: "Sábado, 22 de julho de 2024 às 10:00 até sábado, 22 de julho de 2024 às 14:00.",
  },
  {
    id: "987",
    title: "Conferência de Tecnologia",
    description:
      "Venha participar da maior conferência de tecnologia do ano! Palestras, workshops e oportunidades de networking.",
    date: "10/08",
    participantLimit: 200,
    participantCount: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    owner: "TechCon",
    category: "Festa",
    age: "Livre",
    location: "Centro de Convenções TechCity, Belo Horizonte, MG",
    time: "Quinta-feira, 10 de agosto de 2024 às 09:00 até sexta-feira, 11 de agosto de 2024 às 18:00.",
  },
  {
    id: "123",
    title: "Piquenique no Parque",
    description:
      "Junte-se a nós para um dia agradável no parque com muita comida, jogos e diversão ao ar livre.",
    date: "17/07",
    participantLimit: 30,
    participantCount: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1592753054398-9fa298d40e85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGljbmljfGVufDB8fDB8fHww",
    owner: "Amigos ao Ar Livre",
    category: "Natureza",
    age: "Livre",
    location: "Parque das Flores, Salvador, BA",
    time: "Domingo, 17 de julho de 2024 às 11:00 até domingo, 17 de julho de 2024 às 16:00.",
  },
  {
    id: "456",
    title: "Noite de Jazz",
    description:
      "Desfrute de uma noite de jazz com músicos talentosos e uma atmosfera relaxante.",
    date: "29/07",
    participantLimit: 40,
    participantCount: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1512053459797-38c3a066cabd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphenp8ZW58MHx8MHx8fDA%3D",
    owner: "Clube de Jazz da Cidade",
    category: "Música",
    age: "Livre",
    location: "Teatro Municipal, Porto Alegre, RS",
    time: "Sexta-feira, 29 de julho de 2024 às 20:00 até sábado, 30 de julho de 2024 às 00:00.",
  },
  {
    id: "234",
    title: "Expedição de Observação de Aves",
    description:
      "Explore a diversidade de aves em uma emocionante expedição guiada por especialistas.",
    date: "03/08",
    participantLimit: 15,
    participantCount: 8,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661902040689-9cd5ee5b1416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyZCUyMGZseWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    owner: "Clube de Observadores de Aves",
    category: "Natureza",
    age: "Livre",
    location: "Parque Nacional da Serra da Canastra, MG",
    time: "Quarta-feira, 3 de agosto de 2024 às 07:00 até quarta-feira, 3 de agosto de 2024 às 17:00.",
  },
  {
    id: "567",
    title: "Concerto de Piano",
    description:
      "Desfrute de uma noite elegante com um concerto de piano emocionante.",
    date: "12/08",
    participantLimit: 50,
    participantCount: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D",
    owner: "Sociedade de Música Clássica",
    category: "Música",
    age: "Livre",
    location: "Teatro Municipal, Rio de Janeiro, RJ",
    time: "Sexta-feira, 12 de agosto de 2024 às 19:30 até sexta-feira, 12 de agosto de 2024 às 21:30.",
  },
  {
    id: "890",
    title: "Workshop de Fotografia",
    description:
      "Aprenda a capturar momentos especiais com nosso workshop de fotografia. Todos os níveis são bem-vindos!",
    date: "20/08",
    participantLimit: 25,
    participantCount: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
    owner: "FotoArt",
    category: "Artes",
    age: "Livre",
    location: "Studio FotoArt, Brasília, DF",
    time: "Sábado, 20 de agosto de 2024 às 09:00 até sábado, 20 de agosto de 2024 às 13:00.",
  },
  {
    id: "425",
    title: "Caminhada Ecológica",
    description:
      "Explore a beleza natural de nossa região em uma caminhada ecológica guiada.",
    date: "05/08",
    participantLimit: 20,
    participantCount: 12,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683319786202-2ae904c533bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2Fsa2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    owner: "Associação Ambiental",
    category: "Natureza",
    age: "Livre",
    location: "Trilha das Águas, Florianópolis, SC",
    time: "Sábado, 5 de agosto de 2024 às 08:00 até sábado, 5 de agosto de 2024 às 12:00.",
  },
];

export async function getEvents(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockedEvents;
}

export async function getSingleEvent(id: string): Promise<Event | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let event = mockedEvents.find((event) => event.id === id);

  if (!event) {
    return;
  }

  return event;
}
