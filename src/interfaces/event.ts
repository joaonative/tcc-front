export default interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  participantLimit: number;
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: "Música" | "Festa" | "Natureza" | "Artes" | "";
  age: string;
  location: string;
  time: string;
}
