//役割: フロントエンド（Reactコンポーネント）でSupabaseを使用するためのクライアントサイドの関数を定義するファイル

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
