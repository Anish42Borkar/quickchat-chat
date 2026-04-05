import type { Dispatch } from 'react';
import type { ContactT, ConversationT } from '../types';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

type chartAreaProps = {
  contact: ContactT | undefined;
  messages: ConversationT[];
  isTyping: boolean;
  input: string;
  onInputChange: Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
};

export function ChatArea({
  contact,
  messages,
  isTyping,
  input,
  onInputChange,
  onSend,
}: chartAreaProps) {
  return (
    <div className='chat-area'>
      <div className='chat-bg' />
      {contact ? (
        <>
          <ChatHeader contact={contact} />
          <MessageList
            messages={messages}
            contact={contact}
            isTyping={isTyping}
          />
          <MessageInput
            value={input}
            onChange={onInputChange}
            onSend={onSend}
            placeholder={`Message ${contact.name.split(' ')[0]}…`}
          />
        </>
      ) : (
        <div className='empty-state'>
          <div className='empty-icon'>💬</div>
          <div className='empty-title'>No chat selected</div>
          <div className='empty-sub'>
            Choose a conversation to start messaging
          </div>
        </div>
      )}
    </div>
  );
}
