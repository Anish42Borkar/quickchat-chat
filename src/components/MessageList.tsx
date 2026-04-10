import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationT, MessageT } from '../types';
import { useUserDetails } from '../store/userDetailStore';

type MessageListProps = {
  messages: MessageT[];
  contact: ConversationT;
  isTyping: boolean;
};

export function MessageList({ messages, contact, isTyping }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className='messages-wrap'>
      <div className='date-divider'>Today</div>

      {messages.map((msg, i) => {
        const next = messages[i + 1];
        // const hideAvatar = !msg.me && !!next && !next.me;
        // const showMeta = !next || next.me !== msg.me;
        return (
          <MessageBubble
            key={i}
            message={msg}
            showAvatar={!true}
            showMeta={true}
            // showAvatar={!hideAvatar}
            // showMeta={showMeta}
            avatarColor={'contact.color'}
            avatarEmoji={'contact.emoji'}
          />
        );
      })}
      {isTyping && (
        <div className='msg-row them'>
          <div className='msg-avatar' style={{ background: 'contact.color' }}>
            {'contact.emoji'}
          </div>
          <TypingIndicator name={contact.otherUserName} />
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
