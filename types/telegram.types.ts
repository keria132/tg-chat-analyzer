export interface TelegramChatExport {
  name: string;
  type: string;
  id: number;
  messages: TelegramMessage[];
}

export interface TelegramMessage {
  id: number;
  type: string;
  date: string;
  date_unixtime: string;
  from: string;
  from_id: string;
  reply_to_message_id?: number;
  photo?: string;
  photo_file_size?: number;
  file?: string;
  file_name?: string;
  file_size?: number;
  thumbnail?: string;
  thumbnail_file_size?: number;
  media_type?: string;
  mime_type?: string;
  duration_seconds?: number;
  width?: number;
  height?: number;
  sticker_emoji?: string;
  text: string;
  text_entities?: Array<{
    type: string;
    text: string;
  }>;
}

type MessageCategory =
  | 'textMessages'
  | 'voiceMessages'
  | 'videoMessages'
  | 'photos'
  | 'videos'
  | 'stickers'
  | 'music'
  | 'gif'
  | 'unsortedFiles';

export interface UserMessages extends Record<MessageCategory, TelegramMessage[]> {
  id: string;
  totalMessages: number;
}

export interface MessagePerUser {
  [user: string]: UserMessages;
}
