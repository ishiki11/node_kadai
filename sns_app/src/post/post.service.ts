import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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

  // 投稿を取得する
  async getPost() {
    return this.prisma.posts.findMany();
  }
}
