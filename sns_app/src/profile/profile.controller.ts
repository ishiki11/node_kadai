import { Controller, Get, Param, Req, Res, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PostService } from './../post/post.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
  ) {}

  // プロフィール一覧取得
  @Get('/json')
  async getProfiles(@Res() response: any) {
    try {
      const profiles = await this.profileService.getProfile();
      return response.json(profiles);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  // 自分のプロフィール
  @Get('/')
  async myProfile(@Req() request: any, @Res() response: any) {
    // ログインしてるアカウントID取得
    const account_id = request.session.account_id;
    if (!account_id) {
      // ログインしてない時
      return response.redirect('/signin');
    }
    try {
      // アカウントIDが一致するプロフィール取得
      const result = await this.profileService.findProfileById(account_id);
      // アカウントIDが一致する投稿取得
      const posts = await this.postService.findPostById(account_id);
      return response.render('myprofile', {
        posts: posts,
        profile: result,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // プロフィール編集画面 /profile/edit
  @Get('/edit')
  async profileEditDisp(@Res() response: any, @Req() request: any) {
    const account_id = request.session.account_id;
    if (!account_id) {
      // ログインしてない時
      return response.redirect('/signin');
    }
    try {
      // アカウントIDからprofile取得
      const profile = await this.profileService.findProfileById(account_id);
      return response.render('profileedit', {
        profile: profile,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 編集する
  @Post('/edit')
  async profileEdit(
    @Body() data: any,
    @Res() response: any,
    @Req() request: any,
  ) {
    const account_id = request.session.account_id;
    try {
      // アカウントIDからprofile取得
      const profile = await this.profileService.findProfileById(account_id);
      if (!data.name && !data.profile_id && !data.self_pr) {
        // 何も入力がない時
        return response.render('profileedit', {
          profile: profile,
          errors: '何も入力されていません',
        });
      } else {
        // 名前が入力されていない時
        if (!data.name) {
          // 元の値を入れる
          data.name = profile.name;
        }
        // プロフィールIDが入力されているとき
        if (data.profile_id) {
          // 変更下プロフィールIDが一意がどうか
          const flg = await this.profileService.findProfileByProfileId(
            data.profile_id,
          );
          // 一意じゃないとき
          if (flg) {
            return response.render('/profile', {
              profile: profile,
              errors: '同じプロフィールIDが存在します',
            });
          }
        } else {
          // プロフィールIDが入力されていないとき
          data.profile_id = profile.profile_id;
        }
        if (!data.self_pr) {
          data.self_pr = profile.self_pr;
        }
        // プロフィールを更新する
        const update = await this.profileService.updateProfile(
          account_id,
          data,
        );
        return response.redirect('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // プロフィールIDからプロフィール取得 /profile/:data
  @Get('/:data')
  async Profiles(
    @Param('data') data: string,
    @Res() response: any,
    @Req() request: any,
  ) {
    const account_id = request.session.account_id;
    if (!account_id) {
      // ログインしてない時
      return response.redirect('/signin');
    }
    try {
      // アカウントIDからprofile取得
      const profile = await this.profileService.findProfileById(account_id);
      // 今ログインしてるプロフィールの場合
      if (profile.profile_id == data) {
        return response.redirect('/profile');
      }
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
