import { Guest } from "./guest";

export interface Party{
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  created_at: string;
  updated_at: string;
  hostId: number;
  guests: Guest[];
}