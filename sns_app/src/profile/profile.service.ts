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

  // プロフィールIDが一致するプロフィール取得
  async findProfileByProfileId(profileId: string): Promise<Profiles | null> {
    return this.prisma.profiles.findUnique({
      where: {
        profile_id: profileId,
      },
    });
  }

  // アカウントIDが一致するプロフィール取得
  async findProfileById(accountId: number): Promise<Profiles | null> {
    return this.prisma.profiles.findUnique({
      where: {
        account_id: accountId,
      },
    });
  }

  // 編集機能
  async updateProfile(accountId: number, data: any): Promise<Profiles | null> {
    return this.prisma.profiles.update({
      where: {
        account_id: accountId,
      },
      data: {
        profile_id: data.profile_id,
        name: data.name,
        self_pr: data.self_pr,
        icon: data.icon,
      },
    });
  }

  // プロフィール一覧取得
  async getProfile(): Promise<Profiles[]> {
    return this.prisma.profiles.findMany();
  }
}
