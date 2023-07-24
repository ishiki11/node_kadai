import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(mail: string, password: string, repassword: string): Promise<any> {
    // データベース操作の処理をここで実行
  }
}
