import { ChartConfig } from './ui/chart';
import { TelegramChatExport } from '@/types/telegram.types';
import { buildChartData, buildUsersChartData } from '@/lib/helpers';
import { useMemo } from 'react';
import ChartCardWrapper from './Charts/ChartCardWrapper';
import ChatActivityChart from './Charts/ChatActivityChart';
import UserActivityChart from './Charts/UserActivityChart';

const AnalyticsSection = ({ chatData }: { chatData: TelegramChatExport }) => {
  const ActivityChartConfig = {
    messages: {
      label: 'Messages',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => buildChartData(chatData.messages), [chatData.messages]);
  const usersChartData = useMemo(() => buildUsersChartData(chatData.messages), [chatData.messages]);
  const chatActivityDate = `from ${chartData[0].date} to ${chartData[chartData.length - 1].date}`;

  return (
    <div className='m-auto mt-10 flex flex-wrap items-start justify-start gap-4'>
      <ChartCardWrapper
        chartTitle='Chat activity'
        chartDescription='Activity per month'
        chartFooterText='Chat messages activity'
        chartDate={chatActivityDate}
        className='w-full'
      >
        <ChatActivityChart chartConfig={ActivityChartConfig} chartData={chartData} className='h-[250px]' />
      </ChartCardWrapper>
      <ChartCardWrapper
        chartTitle='Activity per user'
        chartDescription='Messages count per user'
        chartFooterText='User messages activity'
        chartDate={chatActivityDate}
        className='w-1/2'
      >
        <UserActivityChart chartConfig={ActivityChartConfig} chartData={usersChartData} />
      </ChartCardWrapper>
    </div>
  );
};

export default AnalyticsSection;
