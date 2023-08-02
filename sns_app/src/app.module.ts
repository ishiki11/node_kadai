import { Module, Controller } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SignupController } from './account/signup/signup.controller';
import { AccountService } from './account/account.service';
import { SigninController } from './account/signin/signin.controller';
import { ProfileService } from './profile/profile.service';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [AppController, SignupController, SigninController, PostController],
  providers: [AppService, AccountService, ProfileService, PostService],
})
export class AppModule {}
