import { TelegramMessage } from '@/types/telegram.types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MESSAGES_CAPACITY } from './chatAnalysis.constants';
import ChatAnalysisSkeleton from './ChatAnalysisSkeleton';
import { Button } from '../ui/button';
import { ChatType, TextMessage } from './chatAnalysis.types';
import ChatAnalysisPanel from './ChatAnalysisPanel';
import { ChatAnalysisType } from '@/lib/schemas/chatAnalysis.schemas';
import { getChatAnalysis } from '@/app/actions/chatAnalysis';

interface ChatAnalysisProps {
  chatMessages: TelegramMessage[];
  className?: string;
}

interface FetchStatus {
  isLoading: boolean;
  error: null | string;
}

const ChatAnalysis = ({ chatMessages, className }: ChatAnalysisProps) => {
  const [chatAnalysis, setChatAnalysis] = useState<ChatAnalysisType | null>(null);
  const [{ isLoading, error }, setFetchStatus] = useState<FetchStatus>({ isLoading: false, error: null });

  const { users, messages, messageCountByUser } = useMemo(() => {
    const users = new Set<string>();
    const messages: TextMessage[] = [];
    const messageCountByUser: Record<string, number> = {};

    chatMessages.forEach(message => {
      if (message.type === 'message' && message.text) {
        messages.push({ text: message.text, from: message.from, date: message.date });
        messageCountByUser[message.from] = (messageCountByUser[message.from] ?? 0) + 1;
        users.add(message.from);
      }
    });

    return { users, messages, messageCountByUser };
  }, [chatMessages]);

  const chatType = useMemo(() => (users.size === 2 ? ChatType.DirectChat : ChatType.GroupChat), [users.size]);

  const hasCalledApi = useRef(false);

  const fetchChatAnalysis = useCallback(async () => {
    setFetchStatus({
      isLoading: true,
      error: null,
    });

    try {
      const chatAnalysisResponse = await getChatAnalysis(messages.slice(-MESSAGES_CAPACITY), chatType);

      setChatAnalysis(chatAnalysisResponse);
    } catch (error) {
      setFetchStatus({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Fetch failed!',
      });
    } finally {
      setFetchStatus(previousState => ({
        ...previousState,
        isLoading: false,
      }));

      hasCalledApi.current = false;
    }
  }, [messages, chatType]);

  useEffect(() => {
    if (hasCalledApi.current) return;
    hasCalledApi.current = true;

    fetchChatAnalysis();
  }, [messages, fetchChatAnalysis]);

  if (isLoading) return <ChatAnalysisSkeleton className={className} users={users} />;

  if (error)
    return (
      <div className='col-span-full flex flex-col items-center gap-2'>
        <div className='text-destructive flex items-center gap-2'>
          <CircleAlert className='w-4' />
          <p className='text-lg'>An Error occurred!</p>
        </div>
        <p className=''>{error}</p>
        <Button variant='outline' onClick={fetchChatAnalysis}>
          Retry
        </Button>
      </div>
    );

  return (
    <section className={cn('flex flex-wrap items-start gap-4', className)}>
      <h3 className='w-full text-center text-2xl'>Chat AI Analysis</h3>
      <ChatAnalysisPanel chatAnalysis={chatAnalysis} messageCountByUser={messageCountByUser} />
    </section>
  );
};

export default ChatAnalysis;
