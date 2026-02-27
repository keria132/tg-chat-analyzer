import { TelegramMessage } from '@/types/telegram.types';
import { sortUsersMessages } from './sortUsersMessages';
import { ChartDataItem, UserChartDataItem } from '@/types/chart.types';

interface MonthlyActvityMap {
  date: string;
  totalMessages: number;
  users: Record<string, number>;
}

export const buildChartData = (chatMessages: TelegramMessage[]): ChartDataItem[] => {
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions);
  const monthlyActivityMap: Record<string, MonthlyActvityMap> = {};
  const usersList = new Set<string>();

  for (const message of chatMessages) {
    if (!message.from) continue; // skip service messages

    const date = new Date(message.date);
    const formattedDate = dateFormat.format(date);
    const userName = message.from;

    if (!monthlyActivityMap[formattedDate]) {
      monthlyActivityMap[formattedDate] = { date: formattedDate, totalMessages: 0, users: {} };
    }

    if (!monthlyActivityMap[formattedDate].users[userName]) {
      monthlyActivityMap[formattedDate].users[userName] = 0;
      usersList.add(userName);
    }

    monthlyActivityMap[formattedDate].users[userName]++;
    monthlyActivityMap[formattedDate].totalMessages++;
  }

  const userCountList = [...usersList].reduce<Record<string, number>>(
    (accumulator, current) => ({ ...accumulator, [current]: 0 }),
    {}
  );

  const data = Object.values(monthlyActivityMap).map(({ date, totalMessages, users }) => ({
    date,
    totalMessages,
    ...userCountList,
    ...users,
  }));

  return data;
};

export const buildUsersChartData = (messages: TelegramMessage[]): UserChartDataItem[] => {
  const messagesPerUser = sortUsersMessages(messages);
  //TODO: Filter the bot participants here
  return Object.keys(messagesPerUser).map(userName => ({
    user: userName,
    messages: messagesPerUser[userName].totalMessages,
  }));
};
