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
  // お気に入りリストに追加する Action
  addFavorite: (armorId: number, createdAt: Date) => Promise<void>;
  // お気に入りリストから削除する Action
  deleteFavorite: (favoriteId: number) => Promise<void>;
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

  addFavorite: async (armorId: number, createdAt: Date) => {
    try {
      set({ isLoading: true, error: null });

      // 重複チェック(基本は起こり得ないが、万一のために追加)
      const currentState = useFavoriteStore.getState();
      if (currentState.favorites?.some((favorite) => favorite.armorId === armorId)) {
        set({ isLoading: false });
        return; // 既に存在する場合は追加しない
      }

      const res = await fetch('/api/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ armorId, createdAt }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'ユーザーのお気に入りリストの追加に失敗しました');
      }
      // ストアに追加されたお気に入りを追加する
      const newFavorite = (await res.json()) as Favorite;
      set((state) => ({
        favorites: state.favorites ? [...state.favorites, newFavorite] : [newFavorite],
        isLoading: false,
      }));
    } catch (error) {
      console.error('ユーザーのお気に入りリストの追加に失敗:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーのお気に入りリストの追加に失敗しました',
        isLoading: false,
      });
    }
  },

  deleteFavorite: async (favoriteId: number) => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch(`/api/favorite`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteId }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'ユーザーのお気に入りリストの削除に失敗しました');
      }

      // ストアから削除されたお気に入りを除去する
      set((state) => ({
        // お気に入りが空の場合はnullを返す
        favorites: state.favorites?.filter((favorite) => favorite.id !== favoriteId) || null,
        isLoading: false,
      }));
    } catch (error) {
      console.error('ユーザーのお気に入りリストの削除に失敗:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーのお気に入りリストの削除に失敗しました',
        isLoading: false,
      });
    }
  },

  clearFavorites: () => {
    set({ favorites: null, error: null });
  },
}));
