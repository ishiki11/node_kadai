import { Controller, Get, Render, Post, Body, Res, Req } from '@nestjs/common';
import { AccountService } from './../account.service';
import { ProfileService } from './../../profile/profile.service';
import { CreateAccountDto } from '../dto/account.dto';
import { validate } from 'class-validator';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly accountService: AccountService,
    private readonly profileService: ProfileService,
  ) {}

  // サインアップ
  @Get()
  @Render('signup')
  signUp() {}

  // サインアップの処理
  @Post()
  async createAccount(
    @Body() data: any,
    @Res() response: any,
    @Res() request: any,
  ) {
    console.log(data);
    // validation実行
    const createAccountDto = new CreateAccountDto();
    createAccountDto.email = data.email;
    createAccountDto.password = data.password;
    const errors = await validate(createAccountDto, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      // バリデーションエラーがある場合の処理
      console.log(errors);
      const flatErrors = errors.flatMap((error) =>
        Object.values(error.constraints),
      );
      console.log('flat', flatErrors);
      return response.render('signup', {
        errors: flatErrors,
      });
    } else {
      try {
        // validation通ったdata
        const result = await this.accountService.createAccount(data); // アカウント作成実行
        request.session.account_id = result.account_id; // アカウントIDをセッションに入れる
        const profile = await this.profileService.createProfile(
          request.session.account_id,
        ); // プロフィールを作成
        return response.redirect('/'); // トップにリダイレクト
      } catch (error) {
        console.log(error.message); // エラーが発生した場合はエラーメッセージを表示
        return response.render('signup', {
          errors: [error.message],
        });
      }
    }
  }
}
