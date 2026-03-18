export interface MessageActivityChartDataItem {
  date: string;
  totalMessages: number;
  [key: string]: string | number;
}

export type MessageCategoryMetrics = 'textMessages' | 'voiceMessages' | 'videoMessages';

export interface UserActivityDataItem extends Record<MessageCategoryMetrics, number> {
  user: string;
  totalMessages: number;
}

export const tendencies = ['Romantic', 'Friendly', 'Mixed', 'Neutral', 'Unclear'] as const;
