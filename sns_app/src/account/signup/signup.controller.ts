import { Controller, Param, Get, Render, Post, Body } from '@nestjs/common';
import { AccountService } from './../account.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly accountService: AccountService) {}

  // サインアップ
  @Get('')
  @Render('signup')
  signup() {
    return {
      title: 'サインアップ',
    };
  }
  // サインアップの処理
  @Post('')
  async form(@Body() data: any) {
    const result = await this.accountService.createAccount(data);
    console.log(result);
  }
}
