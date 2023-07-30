import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  accountService: any;
  // constructorに入れることで自動でDIする
  constructor(private readonly appService: AppService) {}

  // アカウント一覧取得
  @Get('test')
  async getAccount(@Res() response) {
    try {
      const accounts = await this.accountService.getAccount();
      return response.json(accounts);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
