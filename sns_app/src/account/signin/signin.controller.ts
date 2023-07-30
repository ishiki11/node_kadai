import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AccountService } from './../account.service';
import { validate } from 'class-validator';

@Controller('signin')
export class SigninController {
  constructor(private readonly accountService: AccountService) {}

  // サインイン
  @Get()
  @Render('signin')
  signUp(): void {}

  // サインインの処理
  @Post()
  async signinAccount(@Body() data: any, @Res() response) {}
}
