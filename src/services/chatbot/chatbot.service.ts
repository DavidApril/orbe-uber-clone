import {orbeApi} from '../../config/api';
import {ChatbotResponse} from '../../interfaces';

export class ChatbotService {
  static async createChat(
    prompt: string,
  ): Promise<ChatbotResponse | undefined> {
    try {
      const {data: response}: {data: ChatbotResponse} = await orbeApi.post(
        `/chatbot/createChat`,
        {
          promp: prompt,
          chat_history: [''],
        },
      );
      return response;
    } catch (error) {
      console.log({error});
    }
  }
}
