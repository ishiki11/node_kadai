import { Controller, Param, Get, Render, Post, Body } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from './../../Service/user/user.service';

@Controller('signup')
export class SignupController {
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
    console.log(data);
    const mail = data.mail;
    const password = data.password[0];
    const repassword = data.password[1];

    // データベース登録
    // const result = await this.UserService.createUser(
    //   mail,
    //   password,
    //   repassword,
    // );
  }
}
