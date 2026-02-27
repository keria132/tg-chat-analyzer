export interface ChartDataItem {
  date: string;
  totalMessages: number;
  [key: string]: string | number;
}

export interface UserChartDataItem {
  user: string;
  messages: number;
}
