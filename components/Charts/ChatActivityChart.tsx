import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { ChartComponentProps } from './chart.types';
//TODO: Make chart min height to a constant
const AreaSingleChart = ({ chartConfig, chartData }: ChartComponentProps) => (
  <ChartContainer config={chartConfig} className='flex min-h-[200px] w-full'>
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
      <Area
        dataKey='messages'
        type='natural'
        fill='var(--color-messages)'
        fillOpacity={0.4}
        stroke='var(--color-messages)'
      />
    </AreaChart>
  </ChartContainer>
);

export default AreaSingleChart;
