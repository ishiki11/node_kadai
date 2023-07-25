import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  createUser(mail: string, password: string, repassword: string): any {
    // データベース操作の処理をここで実行
    try {
      if (password != repassword) {
        throw new Error('');
      }
      if (mail == null && password == null && repassword == null) {
        throw new Error('');
      }
    } catch (e) {}
  }
}
