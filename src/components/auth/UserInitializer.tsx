'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserStore } from '@/store/useUserStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useResultStore } from '@/store/ResultStore';

export default function UserInitializer() {
  const { fetchCurrentUser, clearUser, setAuthInitialized } = useUserStore();
  const { clearFavorites } = useFavoriteStore();
  const { clearResult } = useResultStore();

  useEffect(() => {
    const supabase = createClient();

    // Supabaseのセッションを確認
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // セッションが存在する場合のみユーザー情報を取得
          await fetchCurrentUser();
        }
        // セッション確認が完了したら認証初期化完了をマーク（セッションの有無に関わらず）
        setAuthInitialized();
      } catch (error) {
        console.error('セッション確認エラー:', error);
        // エラーでも認証初期化完了をマーク
        setAuthInitialized();
      }
    };

    checkSession();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        fetchCurrentUser();
      } else if (event === 'SIGNED_OUT') {
        // ログアウト時はストアをクリア
        clearUser();
        clearFavorites();
        clearResult();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchCurrentUser, clearUser, clearFavorites, clearResult, setAuthInitialized]);

  return null; // このコンポーネントはUIを表示しない
}
