'use client';

import { ChangeEvent, useState } from 'react';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { CHAT_UPLOAD_MESSAGES } from './messages';
import { TelegramChatExport } from '@/types/telegram.types';
import AnalyticsSection from '../AnalyticsSection';

const ChatUpload = () => {
  const [chatData, setChatData] = useState<TelegramChatExport | null>(null);

  const handleChatUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      toast.error(CHAT_UPLOAD_MESSAGES.NO_FILE_SELECTED);
      return;
    }

    const chatFile = event.target.files[0];

    if (!chatFile) {
      toast.error(CHAT_UPLOAD_MESSAGES.NO_FILE_SELECTED);
      return;
    }

    const fileReader = new FileReader();
    const toastUploadId = 'upload';

    fileReader.onload = () => {
      if (typeof fileReader.result !== 'string') {
        toast.error(CHAT_UPLOAD_MESSAGES.ERROR_READING_FILE, { id: toastUploadId });
        return;
      }

      try {
        const chatResult: TelegramChatExport = JSON.parse(fileReader.result);

        toast.success(CHAT_UPLOAD_MESSAGES.SUCCESS_UPLOAD, { id: toastUploadId });

        setChatData(chatResult);
      } catch (error) {
        toast.error(`${CHAT_UPLOAD_MESSAGES.ERROR_PARSING_FILE} Error: ${error}`, { id: toastUploadId });
      }
    };

    fileReader.onprogress = event => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        toast.loading(`Uploading: ${progress.toFixed(2)}%`, { id: toastUploadId }); //TODO: Improve progress bar %
      }
    };

    fileReader.onerror = error => {
      toast.error(`${CHAT_UPLOAD_MESSAGES.ERROR_READING_FILE} Error: ${error}`, { id: toastUploadId });
    };

    fileReader.readAsText(chatFile);
  };

  return (
    <div>
      <Field className='m-auto w-[350px] pt-[200px]'>
        <FieldLabel htmlFor='chat'>Upload your Telegram chat export (JSON format)</FieldLabel>
        <Input className='cursor-pointer' id='chat' type='file' accept='.json' onChange={handleChatUpload} />
        <FieldDescription>Upload a JSON file containing your Telegram chat data to analyze.</FieldDescription>
      </Field>
      {chatData && <AnalyticsSection chatData={chatData} />}
    </div>
  );
};

export default ChatUpload;
