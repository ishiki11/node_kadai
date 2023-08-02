import { Injectable } from '@nestjs/common';
import { PrismaClient, Accounts, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // account作成
  async createAccount(data: any) {
    const email = data.email;
    const password = data.password;
    const repassword = data.repassword;
    // 空が一つでもある時
    if (!email || !password || !repassword) {
      throw new Error('すべて入力して下さい');
    }
    // パスワードが一致しないとき
    if (password != repassword) {
      throw new Error('パスワードが一致しません');
    }
    // メールが一意じゃないとき
    const uniqueEmail = await this.findAccountByEmail(email);
    if (uniqueEmail) {
      throw new Error('既に登録されたメールアドレスです');
    }
    /* パスワードハッシュ化 */
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return this.prisma.accounts.create({
      data: {
        email: email,
        hashed_password: hashed_password,
      },
    });
  }

  // ログイン処理
  async signinAccount(data: any) {
    const email = data.email;
    const password = data.password;
    // 空がある時
    if (!email || !password) {
      throw new Error('すべて入力して下さい');
    }
    // メールが一致するアカウント取得
    const account = await this.findAccountByEmail(email);
    // アカウントがない時
    if (!account) {
      throw new Error('アカウントが存在しません');
    }
    // bcrypt.compare() メソッドをawaitで呼び出す
    const isMatch = await bcrypt.compare(password, account.hashed_password);
    if (isMatch) {
      // パスワードが一致した場合の処理
      console.log('パスワードが一致しました');
    } else {
      // パスワードが一致しない場合の処理
      throw new Error('パスワードが間違っています');
    }
    return account;
  }

  // メールが一致するdata取得
  async findAccountByEmail(email: string): Promise<Accounts | null> {
    return this.prisma.accounts.findUnique({
      where: {
        email,
      },
    });
  }

  // 投稿一覧取得
  async getPost(): Promise<Accounts[]> {
    return this.prisma.accounts.findMany({
      where: {
        is_active: true,
      },
    });
  }

  // アカウント一覧取得
  async getAccount(): Promise<Accounts[]> {
    return this.prisma.accounts.findMany();
  }
}
