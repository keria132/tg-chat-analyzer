import { ReactNode } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface ChartCardWrapper {
  chartTitle: string;
  chartDescription: string;
  chartFooterText?: string;
  chartDate?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

const ChartCardWrapper = ({
  chartTitle,
  chartDescription,
  chartFooterText,
  chartDate,
  children,
  action,
  className,
}: ChartCardWrapper) => (
  <Card className={cn('gap-4', className)}>
    <CardHeader>
      <CardTitle>{chartTitle}</CardTitle>
      <CardDescription>{chartDescription}</CardDescription>
      <CardAction>{action}</CardAction>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter className='flex-col items-start'>
      <p>{chartFooterText}</p>
      <p className='text-muted-foreground text-sm'>{chartDate}</p>
    </CardFooter>
  </Card>
);

export default ChartCardWrapper;
