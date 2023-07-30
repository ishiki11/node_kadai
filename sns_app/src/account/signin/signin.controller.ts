import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AccountService } from './../account.service';
import { CreateAccountDto } from '../dto/account.dto';
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
  async signinAccount(@Body() data: any, @Res() response, @Req() request) {
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
      // errorをhbsに表示
      return response.render('signin', {
        errors: flatErrors,
      });
    } else {
      // ログイン処理
      try {
        const result = await this.accountService.signinAccount(data); // ログイン実行
        request.session.account_id = result.account_id; // アカウントIDをセッションに入れる
        return response.redirect('/'); // トップにリダイレクト
      } catch (error) {
        console.log(error.message); // エラーが発生した場合はエラーメッセージを表示
        return response.render('signin', {
          errors: [error.message],
        });
      }
    }
  }
}
