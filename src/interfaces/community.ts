export default interface Community {
  id: string;
  title: string;
  description: string;
  participantLimit: number;
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: "Música" | "Festa" | "Natureza" | "Artes" | "";
  age: string;
  location: string;
}
