import { TelegramMessage } from '@/types/telegram.types';

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

interface UserMessages extends Record<MessageCategory, TelegramMessage[]> {
  id: string;
  totalMessages: number;
}

interface MessagePerUser {
  [user: string]: UserMessages;
}

export const sortUsersMessages = (messages: TelegramMessage[]) => {
  const messagesPerUser: MessagePerUser = {};

  messages.forEach(message => {
    if (message.type !== 'message') {
      return;
    }

    const user = message.from || 'Unknown';

    if (!messagesPerUser[user]) {
      messagesPerUser[user] = {
        id: message.from_id,
        textMessages: [],
        voiceMessages: [],
        videoMessages: [],
        photos: [],
        videos: [],
        music: [],
        gif: [],
        stickers: [],
        unsortedFiles: [],
        totalMessages: 0,
      };
    }

    switch (true) {
      case message.media_type === 'voice_message':
        messagesPerUser[user].voiceMessages.push(message);
        break;
      case message.media_type === 'video_message':
        messagesPerUser[user].videoMessages.push(message);
        break;
      case message.photo_file_size && message.photo_file_size > 0:
        messagesPerUser[user].photos.push(message);
        break;
      case message.media_type === 'video_file':
        messagesPerUser[user].videos.push(message);
        break;
      case message.text !== '':
        messagesPerUser[user].textMessages.push(message);
        break;
      case message.media_type === 'sticker':
        messagesPerUser[user].stickers.push(message);
        break;
      case message.media_type === 'animation':
        messagesPerUser[user].gif.push(message);
        break;
      case message.media_type === 'audio_file':
        messagesPerUser[user].music.push(message);
        break;
      default:
        messagesPerUser[user].unsortedFiles.push(message);
        break;
    }

    messagesPerUser[user].totalMessages++;
  });

  return messagesPerUser;
};
