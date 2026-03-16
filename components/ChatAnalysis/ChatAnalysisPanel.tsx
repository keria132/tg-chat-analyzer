import { MessageCircle } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item';
import { Badge } from '../ui/badge';
import { TENDENCY_STYLES, USER_INDICATOR_COLORS } from '@/constants/palletes';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn, typedEntries } from '@/lib/utils';
import { SCORE_LABELS } from './chatAnalysis.constants';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { ChatAnalysisType } from '@/lib/schemas/chatAnalysis.schemas';

interface ChatAnalysisPanelProps {
  chatAnalysis: ChatAnalysisType | null;
  messageCountByUser: Record<string, number>;
}

const ChatAnalysisPanel = ({ chatAnalysis, messageCountByUser }: ChatAnalysisPanelProps) => (
  <>
    <Item variant='outline' className='w-full'>
      <ItemMedia variant='icon'>
        <MessageCircle />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className='text-lg'>Relationship overview:</ItemTitle>
        <ItemDescription className='text-base'>{chatAnalysis?.relationshipOverview}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {chatAnalysis?.relationshipType && (
          <Badge className={cn('text-sm', TENDENCY_STYLES[chatAnalysis.relationshipType])}>
            {chatAnalysis.relationshipType}
          </Badge>
        )}
      </ItemActions>
    </Item>
    {chatAnalysis?.users.map((user, userIndex) => (
      <Card key={user.username} className='min-w-1/3 flex-1 gap-0'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Avatar size='lg'>
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <CardTitle className='text-base'>{user.username}</CardTitle>
              <CardDescription>{messageCountByUser[user.username] ?? 0} messages</CardDescription>
            </div>
          </div>
          <CardAction>
            <Badge variant='outline' className={cn('text-sm', TENDENCY_STYLES[user.tendency])}>
              {user.tendency}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Accordion type='multiple'>
            {typedEntries(user.scores).map(([scoreName, scoreValue]) => (
              <AccordionItem key={scoreName} value={scoreName} className='border-0'>
                <AccordionTrigger className='py-2 hover:no-underline'>
                  <div className='flex w-full flex-wrap gap-1'>
                    <div className='text-muted-foreground flex w-full'>
                      <span className='text-sm'>{SCORE_LABELS[scoreName]}</span>
                      <span className='ml-auto'>{scoreValue}</span>
                    </div>
                    <Progress indicatorClassName={USER_INDICATOR_COLORS[userIndex]} value={scoreValue * 10} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground'>{user.insights[scoreName]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className='mt-6 flex-col items-start gap-2'>
          <Separator />
          <p className='text-lg'>Summary:</p>
          <p className='text-muted-foreground text-base'>{user.summary}</p>
        </CardFooter>
      </Card>
    ))}
  </>
);

export default ChatAnalysisPanel;
