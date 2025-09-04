import { LucideIcon } from 'lucide-react';

// あとでこの型に合わせる
// "id": "cmf534vvd00068omnw053bbmx",
//   "name": "テストユーザー1",
//   "email": "aaaaaa@exaple.com",
//   "imageUrl": null,
//   "authId": "bc4e31bb-a434-4d63-9503-7c06dbdfd56d",
//   "role": "USER",
//   "createdAt": "2025-09-04T07:29:02.593Z",
//   "updatedAt": "2025-09-04T07:29:02.593Z"
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
