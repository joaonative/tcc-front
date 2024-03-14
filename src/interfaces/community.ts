import { Categories } from "./categories";

export default interface Community {
  id: string;
  title: string;
  description: string;
  participantLimit: number;
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: Categories;
  age: string;
  location: string;
}
