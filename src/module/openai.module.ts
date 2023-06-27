import { Module } from '@nestjs/common';
import { OpenAIController } from '../web/rest/openai.controller';
import { OpenAIService } from '../service/openai.service';

@Module({
  imports: [],
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class OpenAIModule {}

