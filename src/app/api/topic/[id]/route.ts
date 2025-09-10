import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

/**
 * [GET] /api/topics/[id]: 特定のトピックスを取得
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topicId = parseInt(params.id, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: '無効なトピックスIDです' }, { status: 400 });
    }
    const admin = request.nextUrl.searchParams.get('admin') === 'true';
    const topic = await prisma.topics.findUnique({
      where: {
        id: topicId,
        ...(admin ? {} : { published: true }), // ADMINは非公開も取得
      },
      select: {
        id: true,
        icon: true,
        title: true,
        content: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!topic) {
      return NextResponse.json({ error: 'トピックスが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error('トピックスの取得に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの取得に失敗しました' }, { status: 500 });
  }
}

/**
 * [DELETE] /api/topics/[id]: 特定のトピックスを削除（管理者のみ）
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    const topicId = parseInt(params.id, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: '無効なトピックスIDです' }, { status: 400 });
    }
    await prisma.topics.delete({
      where: { id: topicId },
    });
    return NextResponse.json({ message: 'トピックスが削除されました' }, { status: 200 });
  } catch (error) {
    console.error('トピックスの削除に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの削除に失敗しました' }, { status: 500 });
  }
}

/**
 * [PATCH] /api/topics/[id]: 特定のトピックスを更新（管理者のみ）
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

    const topicId = parseInt(params.id, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: '無効なトピックスIDです' }, { status: 400 });
    }

    const { icon, title, content, body, published } = await request.json();

    // バリデーション
    if (!icon || !title || !content || !body || typeof published !== 'boolean') {
      return NextResponse.json({ error: '必須フィールドが不足しています' }, { status: 400 });
    }

    // トピックが存在するかチェック
    const existingTopic = await prisma.topics.findUnique({
      where: { id: topicId },
    });

    if (!existingTopic) {
      return NextResponse.json({ error: 'トピックスが見つかりません' }, { status: 404 });
    }

    // トピックを更新（updatedAtは自動で更新される）
    await prisma.topics.update({
      where: { id: topicId },
      data: {
        icon,
        title,
        content,
        body,
        published,
      },
    });

    return NextResponse.json({ message: 'トピックスが更新されました' });
  } catch (error) {
    console.error('トピックスの更新に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの更新に失敗しました' }, { status: 500 });
  }
}
