// export interface ContactT {
//   id: number;
//   name: string;
//   handle: string;
//   status: string;
//   color: string;
//   emoji: string;
//   preview: string;
//   time: string;
//   unread: number;
//   bio: string;
// }

// export interface ConversationT {
//   id: number;
//   me: boolean;
//   text: string;
//   time: string;
//   read: boolean;
// }

export interface UserDetail {
  message: string;
  token: string;
  user: UserT;
}

export interface UserT {
  userId: number;
  name: string;
  email: string;
  token: string;
}

export interface ConversationT {
  conversationId: number;
  updatedAt: Date;
  otherUserId: number;
  otherUserName: string;
  lastMessage: string;
  lastMessageTime: Date;
}

export interface MessageT {
  content: string;
  conversationId: number;
  createdAt: Date;
  id: number;
  senderId: number;
}
