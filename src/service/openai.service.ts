import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenAIService {
  private readonly baseUrl = 'https://api.openai.com/v1';

  async getCompletions(messages: any[]): Promise<any> {
    const endpoint = `${this.baseUrl}/chat/completions`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages,
    };
    const response = await axios.post(endpoint, data, config);
    return response.data;
  }
}

