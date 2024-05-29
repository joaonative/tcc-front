import { Categories } from "./categories";

export default interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  participantLimit: number;
  participants: string[];
  participantCount: number;
  imageUrl: string;
  owner: string;
  category: Categories;
  age_range: string;
  location: string;
  isExpired: boolean;
  mapUrl?: string;
  community?: string;
}
