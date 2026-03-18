import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { SCORE_LABELS } from './chatAnalysis.constants';

interface ChatAnalysisSkeletonProps {
  users: Set<string>;
  className?: string;
}

const ChatAnalysisSkeleton = ({ users, className }: ChatAnalysisSkeletonProps) => (
  <section className={cn('flex w-full flex-wrap items-start gap-4', className)}>
    <div className='flex w-full items-center gap-4 rounded-lg border p-4'>
      <Skeleton className='size-10 shrink-0 rounded-md' />
      <div className='flex flex-1 flex-col gap-2'>
        <Skeleton className='h-5 w-48' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
      <Skeleton className='h-6 w-20 shrink-0 rounded-full' />
    </div>
    {[...users].map(user => (
      <div key={user} className='min-w-1/3 flex-1 rounded-lg border'>
        <div className='flex items-center justify-between p-6 pb-4'>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-10 shrink-0 rounded-full' />
            <div className='flex flex-col gap-1.5'>
              <p>{user}</p>
              <Skeleton className='h-3 w-20' />
            </div>
          </div>
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='flex flex-col gap-4 px-6'>
          {Object.keys(SCORE_LABELS).map(label => (
            <div key={label} className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-6' />
              </div>
              <Skeleton className='h-2 w-full rounded-full' />
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-2 p-6 pt-4'>
          <Skeleton className='h-px w-full' />
          <Skeleton className='mt-2 h-5 w-20' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
      </div>
    ))}
  </section>
);

export default ChatAnalysisSkeleton;
