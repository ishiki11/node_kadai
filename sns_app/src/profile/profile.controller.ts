import { Controller, Get, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //

  // プロフィール一覧取得
  @Get('/json')
  async getProfile(@Res() response: any) {
    try {
      const profiles = await this.profileService.getProfile();
      return response.json(profiles);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
