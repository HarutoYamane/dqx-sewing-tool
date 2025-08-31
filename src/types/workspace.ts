import { LucideIcon } from 'lucide-react';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  favoriteList: number[];
  imageUrl: string | null;
}

export interface Topics {
  id: number;
  icon: LucideIcon;
  content: string;
  createdAt: string;
}
