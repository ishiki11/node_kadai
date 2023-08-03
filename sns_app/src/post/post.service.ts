import { Injectable } from '@nestjs/common';
import { Posts, PrismaClient, Profiles } from '@prisma/client';

@Injectable()
export class PostService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // 投稿する
  async addPost(data: any) {
    return this.prisma.posts.create({
      data: {
        account_id: data.account_id,
        content: data.content,
      },
    });
  }

  // 投稿一覧取得
  async getPost(): Promise<Posts[]> {
    return this.prisma.posts.findMany({
      where: {
        account: {
          is_active: true,
        },
      },
      include: {
        account: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
