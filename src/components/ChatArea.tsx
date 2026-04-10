import { useSelectedConversation } from '../store/useSelectedConversation';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

type chartAreaProps = {
  isTyping: boolean;
};

export function ChatArea({ isTyping }: chartAreaProps) {
  const { selectedConversation: contact } = useSelectedConversation();

  return (
    <div className='chat-area'>
      <div className='chat-bg' />
      {contact ? (
        <>
          <ChatHeader contact={contact} />
          <MessageList contact={contact} isTyping={isTyping} />
          <MessageInput
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
