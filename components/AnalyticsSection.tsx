import { ChartConfig } from './ui/chart';
import { TelegramChatExport } from '@/types/telegram.types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import UserActivityChart from './Charts/UserActivityChart';
import { buildChartData, buildUsersChartData } from '@/lib/helpers';
import AreaSingleChart from './Charts/ChatActivityChart';
import { useMemo } from 'react';

const AnalyticsSection = ({ chatData }: { chatData: TelegramChatExport }) => {
  const ActivityChartConfig = {
    messages: {
      label: 'Messages',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => buildChartData(chatData.messages), [chatData.messages]);
  const usersChartData = useMemo(() => buildUsersChartData(chatData.messages), [chatData.messages]);
  //TODO: Map the chart cards to not repeat
  return (
    <div className='m-auto mt-10 flex min-h-[300px] flex-wrap items-start justify-center gap-4'>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle>Chat activity</CardTitle>
          <CardDescription>Messages count per month</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaSingleChart chartConfig={ActivityChartConfig} chartData={chartData} />
        </CardContent>
        <CardFooter className='flex-col items-start'>
          <p>Chat messages activity</p>
          <p className='text-muted-foreground text-sm'>{`from ${chartData[0].date} to ${chartData[chartData.length - 1].date}`}</p>
        </CardFooter>
      </Card>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle>Activity per user</CardTitle>
          <CardDescription>Messages count per user</CardDescription>
        </CardHeader>
        <CardContent>
          <UserActivityChart chartConfig={ActivityChartConfig} chartData={usersChartData} />
        </CardContent>
        <CardFooter className='flex-col items-start'>
          <p>User messages activity</p>
          <p className='text-muted-foreground text-sm'>{`from ${chartData[0].date} to ${chartData[chartData.length - 1].date}`}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
