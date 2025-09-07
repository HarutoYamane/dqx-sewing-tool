import { create } from 'zustand';
// 型
import { Result } from '@/types/armor';

interface ResultState {
  // 現在ログイン中のユーザー情報の防具毎の裁縫結果を保持する State
  result: Result | null;
  // ローディング状態
  isLoading: boolean;
  // 更新ローディング状態
  isUpdateLoading?: boolean;
  // リセットローディング状態
  isResetLoading?: boolean;
  // エラー情報
  error: string | null;
  // 現在ログイン中のユーザー情報の防具毎の裁縫結果を取得する Action
  fetchResult: (channelId: number) => Promise<void>;
  // 現在ログイン中のユーザー情結果を更新する Action
  updateResult: (channelId: number, isComplete: boolean) => Promise<void>;
  // 現在ログイン中のユーザー情報の防具毎の裁縫結果をリセットする Action
  resetResult: (channelId: number) => Promise<void>;
  // 現在ログイン中のユーザー情報の防具毎の裁縫結果をクリアする Action
  clearResult: () => void;
}

export const useResultStore = create<ResultState>((set) => ({
  result: null,
  isLoading: false,
  error: null,
  fetchResult: async (channelId: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`/api/Armor/Channel/Result?channelId=${channelId}`);
      if (!response.ok) {
        if (response.status === 404) {
          //404エラー（リザルトレコードが存在しない）の場合は正常な状態として扱う（初回は絶対に無い）
          set({ result: null, isLoading: false });
          return;
        }
        throw new Error('ユーザーの防具毎の裁縫結果の取得に失敗しました'); //サーバーエラー
      }
      set({ result: (await response.json()) as Result, isLoading: false });
    } catch (error) {
      console.error('ユーザーの防具毎の裁縫結果の取得に失敗しました:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーの防具毎の裁縫結果の取得に失敗しました',
        isLoading: false,
      });
    }
  },
  updateResult: async (channelId: number, isComplete: boolean) => {
    try {
      set({ isUpdateLoading: true, error: null });
      const response = await fetch(`/api/Armor/Channel/Result?channelId=${channelId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isComplete }),
      });
      if (!response.ok) {
        throw new Error('ユーザーの防具毎の裁縫結果の更新に失敗しました');
      }

      set({ result: (await response.json()) as Result, isUpdateLoading: false });
    } catch (error) {
      console.error('ユーザーの防具毎の裁縫結果の更新に失敗しました:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーの防具毎の裁縫結果の更新に失敗しました',
        isUpdateLoading: false,
      });
    }
  },
  resetResult: async (channelId: number) => {
    try {
      set({ isResetLoading: true, error: null });
      const response = await fetch(`/api/Armor/Channel/Result?channelId=${channelId}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('ユーザーの防具毎の裁縫結果のリセットに失敗しました');
      }
      set({ result: (await response.json()) as Result, isResetLoading: false });
    } catch (error) {
      console.error('ユーザーの防具毎の裁縫結果のリセットに失敗しました:', error);
      set({
        error: error instanceof Error ? error.message : 'ユーザーの防具毎の裁縫結果のリセットに失敗しました',
        isResetLoading: false,
      });
    }
  },
  clearResult: () => {
    set({ result: null, error: null });
  },
}));
