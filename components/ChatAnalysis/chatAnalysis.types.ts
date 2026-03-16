export interface TextMessage {
  from: string;
  date: string;
  text: string;
}

export enum ChatType {
  DirectChat = 'directChat',
  GroupChat = 'groupChat',
}
