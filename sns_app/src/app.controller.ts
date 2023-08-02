import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  accountService: any;
  // constructorに入れることで自動でDIする
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  home(@Req() request: any, @Res() response: any) {
    const account_id = request.session.account_id;
    if (!account_id) {
      return response.redirect('signin');
    }
  }

  @Get('logout')
  Logout(@Req() request: any, @Res() response: any) {
    request.session = {};
    return response.redirect('signin');
  }

  // アカウント一覧取得
  @Get('test')
  async getAccount(@Res() response: any) {
    try {
      const accounts = await this.accountService.getAccount();
      return response.json(accounts);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
