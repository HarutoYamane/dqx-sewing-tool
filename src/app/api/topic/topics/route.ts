import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

/**
 * [GET] /api/topics/list: トピックス一覧をページネーション付きで取得
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const skipTotal = request.nextUrl.searchParams.get('skipTotal') === 'true';
    const admin = request.nextUrl.searchParams.get('admin') === 'true';
    const limit = 15;

    // トピックスを取得
    const topics = await prisma.topics.findMany({
      where: admin ? {} : { published: true }, // Adminは非公開も取得
      orderBy: {
        createdAt: 'desc', // 新しい順
      },
      skip: (pageNumber - 1) * limit,
      take: limit,
    });

    // skipTotalがtrueの場合はtotalを取得しない
    if (skipTotal) {
      return NextResponse.json({
        data: topics,
      });
    }

    // 初回のみtotalを取得
    const total = await prisma.armorSeries.count();

    return NextResponse.json({
      data: topics,
      total,
    });
  } catch (error) {
    console.error('トピックス一覧の取得に失敗しました:', error);
    return NextResponse.json({ error: 'トピックス一覧の取得に失敗しました' }, { status: 500 });
  }
}

/**
 * [POST] /api/topics : トピックスを作成（管理者のみ）
 */
export async function POST(request: Request) {
  try {
    // 認証されたユーザー情報を正しく取得
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ success: false, message: '認証が必要です' }, { status: 401 });
    }

    // データベースからユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { authId: authUser.id },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: '管理者権限が必要です' }, { status: 403 });
    }

    const { icon, title, content, body, published } = await request.json();

    // バリデーション
    if (!icon || !title || !content || !body || typeof published !== 'boolean') {
      return NextResponse.json({ error: '必須フィールドが不足しています' }, { status: 400 });
    }

    // トピックを作成
    await prisma.topics.create({
      data: {
        icon,
        title,
        content,
        body,
        published,
      },
    });

    return NextResponse.json({ message: 'トピックスが作成されました' });
  } catch (error) {
    console.error('トピックスの作成に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの作成に失敗しました' }, { status: 500 });
  }
}
