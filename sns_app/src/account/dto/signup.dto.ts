import { IsString, Length, Matches } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  email: string;

  @IsString()
  @Length(8, 20, { message: 'パスワードは8文字以上20文字以下で入力して下さい' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/, {
    message: 'パスワードは英字と数字を含む形で入力して下さい',
  })
  password: string;
}
