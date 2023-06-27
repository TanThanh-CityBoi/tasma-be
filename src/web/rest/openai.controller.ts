import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { OpenAIService } from '../../service/openai.service';

@Controller('api/completions')
@UseInterceptors(LoggingInterceptor)
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post()
  async getCompletions(@Body('messages') messages: any[]): Promise<any> {
    return this.openaiService.getCompletions(messages);
  }
}
