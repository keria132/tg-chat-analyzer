export interface MessageActivityChartDataItem {
  date: string;
  totalMessages: number;
  [key: string]: string | number;
}

export type MessageCategory = 'textMessages' | 'voiceMessages' | 'videoMessages';

export interface UserActivityDataItem extends Record<MessageCategory, number> {
  user: string;
  totalMessages: number;
}
