import type { Dispatch } from 'react';
import type { ConversationT, MessageT } from '../types';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

type chartAreaProps = {
  contact: ConversationT | null;
  messages: MessageT[];
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
          <MessageList contact={contact} isTyping={isTyping} />
          <MessageInput
            value={input}
            onChange={onInputChange}
            onSend={onSend}
            placeholder={`Message ${contact.otherUserName.split(' ')[0]}…`}
          />
        </>
      ) : (
        <div className='empty-state'>
          <img src='/dark-them-stale-section.png' />
          {/* <div className='empty-icon'>💬</div>
          <div className='empty-title'>No chat selected</div>
          <div className='empty-sub'>
            Choose a conversation to start messaging
          </div> */}
        </div>
      )}
    </div>
  );
}
