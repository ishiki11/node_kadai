import { Injectable } from '@nestjs/common';
import { PrismaClient, Profiles } from '@prisma/client';

@Injectable()
export class ProfileService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // プロフィール作成
  async createProfile(accountId: number): Promise<Profiles> {
    return this.prisma.profiles.create({
      data: {
        account: {
          connect: {
            account_id: accountId,
          },
        },
      },
    });
  }

  // アカウントIDが一致するプロフィール取得
  async findProfileById(account_id: number): Promise<Profiles | null> {
    return this.prisma.profiles.findUnique({
      where: {
        account_id,
      },
    });
  }

  // プロフィール一覧取得
  async getProfile(): Promise<Profiles[]> {
    return this.prisma.profiles.findMany();
  }
}
