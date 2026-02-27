import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface ChartCardWrapper {
  chartTitle: string;
  chartDescription: string;
  chartFooterText?: string;
  chartDate: string;
  children: ReactNode;
  className?: string;
}

const ChartCardWrapper = ({
  chartTitle,
  chartDescription,
  chartFooterText,
  chartDate,
  children,
  className,
}: ChartCardWrapper) => (
  <Card className={cn('gap-4', className)}>
    <CardHeader>
      <CardTitle>{chartTitle}</CardTitle>
      <CardDescription>{chartDescription}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter className='flex-col items-start'>
      <p>{chartFooterText}</p>
      <p className='text-muted-foreground text-sm'>{chartDate}</p>
    </CardFooter>
  </Card>
);

export default ChartCardWrapper;
