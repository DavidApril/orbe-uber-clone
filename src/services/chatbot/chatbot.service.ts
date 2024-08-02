import {orbeApi} from '../../config/api';
import {ChatbotResponse} from '../../interfaces';
import {parseError} from '../../utils';

export class ChatbotService {
  static PREFIX: string = 'chatbot';
  static async createChat(
    prompt: string,
  ): Promise<ChatbotResponse | undefined> {
    try {
      const {data: response}: {data: ChatbotResponse} = await orbeApi.post(
        `/${this.PREFIX}/createChat`,
        {
          promp: prompt,
          chat_history: [''],
        },
      );
      return response;
    } catch (error) {
      parseError(this.PREFIX + '/createChat', error);
    }
  }
}
