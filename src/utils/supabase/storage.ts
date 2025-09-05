import { createClient } from './client';
/**
 * Supabaseストレージから画像の公開URLを取得する
 */
export function getImageUrl(bucket: string, path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}

/**
 * ユーザーアイコンのURLを取得する
 */
export function getUserAvatarUrl(fileName: string): string {
  if (!fileName) {
    return ''; // 空文字を返す
  }
  return getImageUrl('avatars', fileName);
}

/**
 * 防具アイコンのURLを取得する
 */
export function getArmorImageUrl(fileName: string): string {
  if (!fileName) {
    return '/images/armors/default-Image.png'; // デフォルト画像
  }
  return getImageUrl('Armor Image Bucket', fileName);
}

/**
 * 画像URLが有効かどうかをチェックする
 */
export async function checkImageExists(bucket: string, path: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from(bucket).list('', {
      search: path,
    });

    return !error && data && data.length > 0;
  } catch (error) {
    console.error('画像存在チェックエラー:', error);
    return false;
  }
}
