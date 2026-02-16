import { TelegramMessage } from '@/types/telegram.types';
import { sortUsersMessages } from './sortUsersMessages';

interface ChartDataItem {
  date: string;
  messages: number;
}

export const buildChartData = (chatMessages: TelegramMessage[]) => {
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions);

  const chartData = chatMessages.reduce<ChartDataItem[]>((accumulator, message) => {
    const date = new Date(message.date);
    const formattedDate = dateFormat.format(date);

    if (accumulator.length && accumulator[accumulator.length - 1].date === formattedDate) {
      accumulator[accumulator.length - 1].messages++;
      return accumulator;
    }

    return [...accumulator, { date: formattedDate, messages: 1 }];
  }, []);

  return chartData;
};

export const buildUsersChartData = (messages: TelegramMessage[]) => {
  const messagesPerUser = sortUsersMessages(messages);
  //TODO: Filter the bot participants here
  return Object.keys(messagesPerUser).map(userName => ({
    user: userName,
    messages: messagesPerUser[userName].totalMessages,
  }));
};
