// API→データベース操作の関数群

import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/types/workspace';

/**
 * ユーザー関連の操作
 */
export const userOperations = {
  // ユーザーを作成
  async createUser(authId: string, email: string, name: string) {
    return prisma.user.create({ data: { authId, email, name } });
  },

  // すべてのユーザーを取得
  async getAllUsers() {
    return prisma.user.findMany();
  },

  // 認証 ID からユーザーを取得
  async getUserByAuthId(authId: string) {
    return prisma.user.findUnique({ where: { authId } });
  },

  // ユーザー名を更新
  async updateUserName(userId: string, name: string): Promise<UserProfile> {
    return prisma.user.update({ where: { id: userId }, data: { name } });
  },
};
