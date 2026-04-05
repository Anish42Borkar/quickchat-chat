export interface ContactT {
  id: number;
  name: string;
  handle: string;
  status: string;
  color: string;
  emoji: string;
  preview: string;
  time: string;
  unread: number;
  bio: string;
}

export interface ConversationT {
  id: number;
  me: boolean;
  text: string;
  time: string;
  read: boolean;
}

export interface UserDetail {
  message: string;
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
