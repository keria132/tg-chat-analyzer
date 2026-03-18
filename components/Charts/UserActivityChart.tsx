import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { MessageCategoryMetrics, UserActivityDataItem } from '@/types/chart.types';
import { cn } from '@/lib/utils';

const CONTAINER_HEIGHT_BASE = 30;
const CONTAINER_HEIGHT_PER_BAR = 30;
const MAX_CHARACTERS_PER_TICK = 11;

interface UserActivityChartProps {
  chartConfig: ChartConfig;
  chartData: UserActivityDataItem[];
  metricKey: MessageCategoryMetrics | 'totalMessages';
  className?: string;
}

const UserActivityChart = ({ chartConfig, chartData, metricKey, className }: UserActivityChartProps) => (
  <ChartContainer
    config={chartConfig}
    className={cn('flex w-full', className)}
    style={{
      height: CONTAINER_HEIGHT_BASE + CONTAINER_HEIGHT_PER_BAR * chartData.length,
    }}
  >
    <BarChart accessibilityLayer layout='vertical' data={chartData} margin={{ left: -20 }} barCategoryGap={'10%'}>
      <CartesianGrid vertical />
      <XAxis dataKey={metricKey} type='number' tickLine={false} axisLine={false} padding={{ left: 0, right: 15 }} />
      <YAxis
        dataKey='user'
        type='category'
        tickLine={false}
        axisLine={false}
        width={100}
        tickFormatter={value => value.slice(0, MAX_CHARACTERS_PER_TICK)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey={metricKey} fill={`var(--color-${metricKey})`} radius={4} />
    </BarChart>
  </ChartContainer>
);

export default UserActivityChart;
