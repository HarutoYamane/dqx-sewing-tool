import { create } from 'zustand';
// 型
import { Favorite } from '@/types/armor';

interface FavoriteState {
  // ユーザー情報を保持する State
  favorites: Favorite[] | null;
  // ローディング状態
  isLoading: boolean;
  // エラー情報
  error: string | null;
  // 現在ログイン中のユーザー情報のお気に入りリストを取得する Action
  fetchFavorites: () => Promise<void>;
  // ユーザー情報をクリアする Action
  clearFavorites: () => void;
}

// Zustand を使って FavoriteState ストアを作成
export const useFavoriteStore = create<FavoriteState>((set) => ({
  // 初期 State
  favorites: null,
  isLoading: false,
  error: null,

  fetchFavorites: async () => {
    try {
      set({ isLoading: true, error: null });

      // API からユーザー情報のお気に入りリストを取得
      const res = await fetch('/api/favorite');

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'ユーザーのお気に入りリストの取得に失敗しました');
      }

      const favorites = (await res.json()) as Favorite[];
      set({ favorites, isLoading: false });
    } catch (error) {
      console.error('ユーザーのお気に入りリストの取得に失敗:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーのお気に入りリストの取得に失敗しました',
        isLoading: false,
      });
    }
  },

  clearFavorites: () => {
    set({ favorites: null, error: null });
  },
}));
