import { LucideIcon } from 'lucide-react';

export interface UserProfile {
  id: string; //cuid型
  name: string;
  email: string;
  imageUrl: string | null;
  authId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topics {
  id: number;
  icon: LucideIcon;
  content: string;
  createdAt: string;
}
