import { Controller, Get, Req, Res } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { ProfileService } from './profile/profile.service';
import { PostService } from './post/post.service';

@Controller()
export class AppController {
  // constructorに入れることで自動でDIする
  constructor(
    private readonly accountService: AccountService,
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
  ) {}

  // トップ
  @Get('')
  async home(@Req() request: any, @Res() response: any) {
    const account_id = request.session.account_id;
    // ログイン情報がない時はログイン画面遷移
    if (!request.session.account_id) {
      return response.redirect('signin');
    }
    const posts = await this.postService.getPost();
    const myProfile = await this.profileService.findProfileById(account_id);
    return response.render('', {
      posts: posts,
      myProfile: myProfile,
    });
  }

  // ログアウト
  @Get('logout')
  Logout(@Req() request: any, @Res() response: any) {
    request.session = {};
    return response.redirect('signin');
  }

  // アカウント一覧取得
  @Get('account')
  async getAccount(@Res() response: any) {
    try {
      const accounts = await this.accountService.getAccount();
      return response.json(accounts);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
