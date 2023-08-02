import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() data: any,
    @Req() request: any,
    @Res() response: any,
  ) {
    data.account_id = request.session.account_id;
    // 投稿内容がない時
    if (!data.content) {
      alert('内容を記述してください');
      return response.redirect('index');
    }
    // 投稿をデータベースに入れる
    try {
      const result = await this.postService.addPost(data);
      console.log(result);
      return response.redirect('index');
    } catch (error) {
      alert('エラーが発生しました');
      return response.redirect('index');
    }
  }
}
