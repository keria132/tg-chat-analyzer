import { MessageCategory } from './telegram.types';

export interface MessageActivityChartDataItem {
  date: string;
  totalMessages: number;
  [key: string]: string | number;
}

export type MessageCategoryMetrics = Exclude<
  MessageCategory,
  'photos' | 'videos' | 'stickers' | 'music' | 'gif' | 'unsortedFiles'
>;

export interface UserActivityDataItem extends Record<MessageCategoryMetrics, number> {
  user: string;
  totalMessages: number;
}
