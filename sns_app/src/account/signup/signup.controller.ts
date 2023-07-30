import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { AccountService } from './../account.service';
import { CreateAccountDto } from './../dto/signup.dto';
import { validate } from 'class-validator';

@Controller('signup')
export class SignupController {
  constructor(private readonly accountService: AccountService) {}

  // サインアップ
  @Get()
  @Render('signup')
  signUp() {}

  // サインアップの処理
  @Post()
  async createAccount(@Body() data: any, @Res() response) {
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
        const result = await this.accountService.createAccount(data);
        console.log(result);
        return response.redirect('/');
      } catch (error) {
        console.log(error.message); // エラーが発生した場合はエラーメッセージを表示
        return response.render('signup', {
          errors: [error.message],
        });
      }
    }
  }
}
