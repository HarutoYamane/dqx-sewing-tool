import { create } from 'zustand';
import { getUser } from '@/data/workspace';

interface FavoriteStore {
  favorites: number[];
  addFavorite: (favorite: number) => void;
  removeFavorite: (favorite: number) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  // ユーザー毎のお気に入りリストを初期値に設定
  favorites: getUser(1).favoriteList,
  // お気に入りに追加
  addFavorite: (favorite) => set((state) => ({ favorites: [...state.favorites, favorite] })),
  // お気に入りから削除
  removeFavorite: (favorite) => set((state) => ({ favorites: state.favorites.filter((f) => f !== favorite) })),
}));
