import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PostService } from './../post/post.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
  ) {}

  // プロフィール一覧取得
  @Get('json')
  async getProfiles(@Res() response: any) {
    try {
      const profiles = await this.profileService.getProfile();
      return response.json(profiles);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  // プロフィール画面描画
  @Get()
  async testProfile(@Req() request: any, @Res() response: any) {
    // ログインしてるアカウントID取得
    const account_id = request.session.account_id;
    if (!account_id) {
      // ログインしてない時
      return response.redirect('signin');
    }
    try {
      // アカウントIDが一致するプロフィール取得
      const result = await this.profileService.findProfileById(account_id);
      // アカウントIDが一致する投稿取得
      const posts = await this.postService.findPostById(account_id);
      return response.render('profile', {
        posts: posts,
        profile: result,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // プロフィールIDからプロフィール取得 /profile/:data
  @Get(':data')
  async Profiles(
    @Param('data') data: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    try {
      // プロフィールIDが一致するプロフィール取得
      const result = await this.profileService.findProfileByProfileId(data);
      // プロフィールIDが一致する投稿取得
      const posts = await this.postService.findPostByProfileId(data);
      return response.render('profile', {
        posts: posts,
        profile: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
