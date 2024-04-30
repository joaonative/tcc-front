import { Categories } from "./categories";

export interface Community {
  _id: string;
  name: string;
  description: string;
  participantLimit: number;
  participants: string[];
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: Categories;
  age_range: string;
}
