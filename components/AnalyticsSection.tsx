import { ChartConfig } from './ui/chart';
import { TelegramChatExport } from '@/types/telegram.types';
import { buildChartData, buildUserActivityChartData } from '@/lib/helpers';
import { useMemo, useState } from 'react';
import ChartCardWrapper from './Charts/ChartCardWrapper';
import MessageActivityChart from './Charts/MessageActivityChart';
import UserActivityChart from './Charts/UserActivityChart';
import { analyticsPalette } from '@/constants/palletes';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const AnalyticsSection = ({ chatData }: { chatData: TelegramChatExport }) => {
  const [metricKey, setMetricKey] = useState<keyof typeof ActivityChartConfig>('totalMessages');
  type MetricKeyType = keyof typeof ActivityChartConfig;

  //TODO: put config in separate file
  const ActivityChartConfig = {
    totalMessages: {
      label: 'Messages',
      color: '#60a5fa',
    },
    voiceMessages: {
      label: 'Voice Messages',
      color: analyticsPalette.emerald,
    },
    videoMessages: {
      label: 'Video Messages',
      color: analyticsPalette.amber,
    },
    textMessages: {
      label: 'Text Messages',
      color: analyticsPalette.violet,
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => buildChartData(chatData.messages), [chatData.messages]);
  const usersChartData = useMemo(() => buildUserActivityChartData(chatData.messages), [chatData.messages]);
  const chatActivityDate = `from ${chartData[0].date} to ${chartData[chartData.length - 1].date}`;

  return (
    <div className='m-auto mt-10 grid grid-cols-2 items-start justify-start gap-4'>
      <ChartCardWrapper
        chartTitle='Chat activity'
        chartDescription='Activity per month'
        chartFooterText='Chat messages activity'
        chartDate={chatActivityDate}
        className='col-span-2'
      >
        <MessageActivityChart chartConfig={ActivityChartConfig} chartData={chartData} className='h-[250px]' />
      </ChartCardWrapper>
      <ChartCardWrapper
        chartTitle='Activity per user'
        chartDescription='Messages count per user'
        chartDate={chatActivityDate}
        action={
          <Select
            value={metricKey}
            onValueChange={value => {
              if (value in ActivityChartConfig) {
                setMetricKey(value as MetricKeyType);
              }
            }}
          >
            <SelectTrigger className='w-fit'>
              <SelectValue placeholder='Messages type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='totalMessages'>Total messages</SelectItem>
                <SelectItem value='textMessages'>Text messages</SelectItem>
                <SelectItem value='voiceMessages'>Voice messages</SelectItem>
                <SelectItem value='videoMessages'>Video messages</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      >
        <UserActivityChart
          key={metricKey}
          chartConfig={ActivityChartConfig}
          chartData={usersChartData}
          metricKey={metricKey}
        />
      </ChartCardWrapper>
    </div>
  );
};

export default AnalyticsSection;
