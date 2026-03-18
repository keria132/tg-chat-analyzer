import { TelegramChatExport } from '@/types/telegram.types';
import { buildChartData, buildUserActivityChartData } from '@/lib/helpers';
import { useMemo, useState } from 'react';
import ChartCardWrapper from './Charts/ChartCardWrapper';
import MessageActivityChart from './Charts/MessageActivityChart';
import UserActivityChart from './Charts/UserActivityChart';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ActivityChartConfig } from './Charts/chartConfigs';
import { Separator } from './ui/separator';
import ChatAnalysis from './ChatAnalysis/ChatAnalysis';

type MetricKeyType = keyof typeof ActivityChartConfig;

const AnalyticsSection = ({ chatData }: { chatData: TelegramChatExport }) => {
  const [metricKey, setMetricKey] = useState<MetricKeyType>('totalMessages');

  const chartData = useMemo(() => buildChartData(chatData.messages), [chatData.messages]);
  const usersChartData = useMemo(() => buildUserActivityChartData(chatData.messages), [chatData.messages]);
  const chatActivityDate = `from ${chartData[0].date} to ${chartData[chartData.length - 1].date}`;

  return (
    <div className='m-auto mt-10 grid grid-cols-2 items-start justify-start gap-4'>
      <h2 className='col-span-2 text-center text-2xl'>Chat basic metrics</h2>
      <ChartCardWrapper
        chartTitle='Chat overall activity'
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
      <Separator className='col-span-2' />
      <ChatAnalysis className='col-span-2' chatMessages={chatData.messages} />
    </div>
  );
};

export default AnalyticsSection;
