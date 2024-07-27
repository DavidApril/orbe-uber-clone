export interface ChatbotResponse {
  data: Datum[];
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface Datum {
  role: 'user' | 'assistant';
  content: Content[];
}

export interface Content {
  type: string;
  text: any;
}

export type Role = 'assistant' | 'user';
export type Message = {role: Role; text: string};