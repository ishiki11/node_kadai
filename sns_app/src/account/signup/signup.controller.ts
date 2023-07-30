import {
  Controller,
  Param,
  Get,
  Render,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { AccountService } from './../account.service';
import { CreateAccountDto } from './../dto/signup.dto';
import { validate } from 'class-validator';

@Controller('signup')
export class SignupController {
  constructor(private readonly accountService: AccountService) {}

  // サインアップ
  @Get('')
  @Render('signup')
  signUp() {}

  // サインアップの処理
  @Post('')
  @Render('signup')
  async createAccount(@Body() data: CreateAccountDto) {
    // validation実行
    console.log(data);
    const errors = await validate(data, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      // バリデーションエラーがある場合の処理
      return {
        errors,
      };
    } else {
      try {
        // validation通ったdata
        const result = await this.accountService.createAccount(data);
        console.log(result);
        return { url: '/' };
      } catch (error) {
        console.error(error); // エラーが発生した場合はエラーメッセージを表示
        return {
          title: 'サインアップ',
          error,
        };
      }
    }
  }

  @Get('test')
  async getAllAcounts(): Promise<void> {
    const account = await this.accountService.getAccount();
    console.log(account);
  }
}
