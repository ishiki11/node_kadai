import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  accountService: any;
  // constructorに入れることで自動でDIする
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  home(@Req() request, @Res() response) {
    const account_id = request.session.account_id;
    console.log(account_id);
    if (!account_id) {
      return response.redirect('signin');
    }
  }

  @Get('logout')
  Logout(@Req() request, @Res() response) {
    request.session = null;
    return response.redirect('signin');
  }

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
