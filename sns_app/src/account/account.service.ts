import { Injectable } from '@nestjs/common';
import { PrismaClient, Accounts } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // account作成
  async createAccount(data: any) {
    console.log(data);
    const email = data.mail;
    const password = data.password;
    const repassword = data.repassword;
    // 空が一つでもある時
    if (!email || !password || !repassword) {
      return new Error('すべて入力して下さい');
    }
    // パスワードが一致しないとき
    if (password != repassword) {
      return new Error('パスワードが一致しません');
    }
    // メールが一意じゃないとき
    const uniqueEmail = await this.findAccountByEmail(email);
    if (uniqueEmail) {
      return new Error('既に登録されたメールアドレスです');
    }
    /**
     * パスワードハッシュ化
     */
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return this.prisma.accounts.create({
      data: {
        email: email,
        hashed_password: hashed_password,
      },
    });
  }

  // メールが一意か
  async findAccountByEmail(email: string): Promise<Accounts | null> {
    return this.prisma.accounts.findUnique({
      where: {
        email,
      },
    });
  }

  // アカウント一覧取得
  async getAccount(): Promise<Accounts[]> {
    return this.prisma.accounts.findMany();
  }
}
