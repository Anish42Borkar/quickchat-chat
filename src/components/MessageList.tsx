import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationT, MessageT } from '../types';
import { useUserDetails } from '../store/userDetailStore';
import { useSelectedConversation } from '../store/useSelectedConversation';
import api from '../lib/axios';
import { useSocket } from '../hooks/useSocket';

type MessageListProps = {
  // messages: MessageT[];
  contact: ConversationT;
  isTyping: boolean;
};

export function MessageList({ contact, isTyping }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageT[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isFetchingOlder, setIsFetchingOlder] = useState(false);
  const prevHeightRef = useRef(0);

  useSocket(appendMessage);

  function appendMessage(msg: MessageT) {
    setMessages((prev) => {
      const list = [...prev];
      list.push(msg);
      return list;
    });
  }

  const { selectedConversation } = useSelectedConversation();
  selectedConversation?.conversationId;

  const fetchMessages = async () => {
    if (!containerRef.current) return;
    if (loading || !hasMore) return;

    const container = containerRef.current;

    // store height BEFORE update
    prevHeightRef.current = container.scrollHeight;
    setIsFetchingOlder(true);

    setLoading(true);

    let url = `/chat/messages?conversationId=${selectedConversation?.conversationId}`;

    if (cursor) {
      url += `&parsedCursor=${encodeURIComponent(cursor)}`;
    }

    const data = (await api.get(url)).data.reverse();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setMessages((prev) => [...data, ...prev]);

      const oldestMessage = data[0];
      setCursor(oldestMessage.createdAt);
    }

    setLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      fetchMessages(); // load older messages
    }
  };

  // useEffect(() => {
  //   endRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, isTyping]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useLayoutEffect(() => {
    if (!isFetchingOlder || !containerRef.current) return;

    const container = containerRef.current;

    const newHeight = container.scrollHeight;

    container.scrollTop = newHeight - prevHeightRef.current;

    setIsFetchingOlder(false);
  }, [messages]);

  return (
    <div ref={containerRef} className='messages-wrap' onScroll={handleScroll}>
      <div className='date-divider'>Today</div>

      {messages.map((msg) => {
        // const hideAvatar = !msg.me && !!next && !next.me;
        // const showMeta = !next || next.me !== msg.me;
        return (
          <MessageBubble
            key={msg.id}
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
