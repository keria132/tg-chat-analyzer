import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { MessageActivityChartDataItem } from '@/types/chart.types';
import { analyticsPalette } from '@/constants/palletes';
import { cn } from '@/lib/utils';

interface MessageActivityChartProps {
  chartConfig: ChartConfig;
  chartData: MessageActivityChartDataItem[];
  className?: string;
}

const MessageActivityChart = ({ chartConfig, chartData, className }: MessageActivityChartProps) => {
  const usersList = Object.keys(chartData[0]).filter(property => property !== 'date' && property !== 'totalMessages');

  return (
    <ChartContainer config={chartConfig} className={cn('flex w-full', className)}>
      <AreaChart accessibilityLayer data={chartData} margin={{ left: 15, right: 15 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          axisLine={false}
          interval='preserveStartEnd'
          tickMargin={5}
          tickFormatter={value => value.slice(0, 3) + ' ' + value.slice(-4)}
          minTickGap={10}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
        {usersList.map((user, index) => (
          <Area
            dataKey={user}
            type='monotone'
            fill={Object.values(analyticsPalette)[index]}
            fillOpacity={0.4}
            stroke={Object.values(analyticsPalette)[index]}
            key={user}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};

export default MessageActivityChart;
