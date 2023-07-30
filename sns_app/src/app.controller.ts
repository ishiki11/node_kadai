import { Controller, Param, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller()
export class AppController {
  // constructorに入れることで自動でDIする
  constructor(private readonly appService: AppService) {}

  // サインイン
  @Get('/signin')
  @Render('signin')
  signin() {
    return {
      title: 'ログイン',
    };
  }
}
