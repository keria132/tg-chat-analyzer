import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { ChartComponentProps } from './chart.types';

const CONTAINER_HEIGHT_PER_BAR = 30; //TODO: Move constants out of the file
const MAX_CHARACTERS_PER_TICK = 11;

const UserActivityChart = ({ chartConfig, chartData }: ChartComponentProps) => (
  <ChartContainer
    config={chartConfig}
    className={`flex min-h-[200px] w-full`}
    style={{
      height: CONTAINER_HEIGHT_PER_BAR * chartData.length,
    }}
  >
    <BarChart accessibilityLayer layout='vertical' data={chartData} margin={{ left: -20 }} barCategoryGap={'10%'}>
      <CartesianGrid vertical />
      <XAxis dataKey='messages' type='number' tickLine={false} axisLine={false} padding={{ left: 0, right: 15 }} />
      <YAxis
        dataKey='user'
        type='category'
        tickLine={false}
        axisLine={false}
        width={100}
        tickFormatter={value => value.slice(0, MAX_CHARACTERS_PER_TICK)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey='messages' fill='var(--color-messages)' radius={4} />
    </BarChart>
  </ChartContainer>
);

export default UserActivityChart;
