import { LucideIcon } from 'lucide-react';

export interface Latest {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Favorite {
  id: number;
  name: string;
  imageUrl: string;
}

export interface MyProfile {
  name: string;
  email: string;
  imageUrl: string | null;
}

export interface Topics {
  id: number;
  icon: LucideIcon;
  content: string;
  createdAt: string;
}
