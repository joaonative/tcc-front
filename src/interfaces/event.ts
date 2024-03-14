import { Categories } from "./categories";

export default interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  participantLimit: number;
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: Categories;
  age: string;
  location: string;
  time: string;
}
