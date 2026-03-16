import { analyticsPalette } from '@/constants/palletes';
import { ChartConfig } from '../ui/chart';

export const ActivityChartConfig = {
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
