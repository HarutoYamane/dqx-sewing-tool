import { create } from 'zustand';
// 型
import { UserProfile } from '@/types/workspace';

interface UserState {
  // ユーザー情報を保持する State
  user: UserProfile | null;
  // ゲストユーザーの判定保持する State（ログインしていない(userが空)場合はtrue）
  isGuest: boolean;
  // ローディング状態
  isLoading: boolean;
  // 認証状態の初期化が完了したかどうか
  isAuthInitialized: boolean;
  // エラー情報
  error: string | null;
  // 現在ログイン中のユーザー情報を取得する Action
  fetchCurrentUser: () => Promise<void>;
  // ユーザー情報を更新する Action
  updateUserName: (name: string) => Promise<void>;
  // ユーザー情報をクリアする Action
  clearUser: () => void;
  // 認証初期化完了をマークする Action
  setAuthInitialized: () => void;
}

// Zustand を使って UserState ストアを作成
export const useUserStore = create<UserState>((set, get) => ({
  // 初期 State
  user: null,
  isGuest: true, //デフォルトはtrueでログインしたらfalseにする
  isLoading: false,
  isAuthInitialized: false, // 認証・ユーザー情報の初期化が完了していない
  error: null,

  fetchCurrentUser: async () => {
    try {
      set({ isLoading: true, error: null });

      // API からユーザー情報を取得
      const res = await fetch('/api/user');

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'ユーザー情報の取得に失敗しました');
      }

      const user = (await res.json()) as UserProfile;
      set({ user, isLoading: false, isGuest: false }); //ユーザー情報を取得したらゲストユーザー判定をfalseにする
    } catch (error) {
      console.error('ユーザー情報の取得に失敗:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザー情報の取得に失敗しました',
        isLoading: false,
      });
    }
  },
  updateUserName: async (name: string) => {
    if (get().isGuest) return;
    try {
      set({ isLoading: true, error: null });
      const currentUser = get().user;

      if (!currentUser) throw new Error('ユーザーがログインしていません');

      // API にユーザー名の更新をリクエスト
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'ユーザー名の更新に失敗しました');
      }

      const updatedUser = (await res.json()) as UserProfile;
      set({ user: updatedUser, isLoading: false });
      set({ isGuest: false }); //一応入れてるけど、ここで更新する必要はない
    } catch (error) {
      console.error('ユーザー名の更新に失敗:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザー名の更新に失敗しました',
        isLoading: false,
      });
    }
  },

  clearUser: () => {
    set({ user: null, isGuest: true, error: null, isAuthInitialized: true });
  },

  setAuthInitialized: () => {
    set({ isAuthInitialized: true });
  },
}));
