// 役割:
// ページアクセス時にユーザーの認証状態を管理するためのミドルウェア
// 全てのページアクセス時に自動実行
// ユーザーのログイン状態を確認
// 保護されたページへのアクセス制御

import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // API ルートにはミドルウェアを適用しない
  if (request.nextUrl.pathname.startsWith('/api/')) return;

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
