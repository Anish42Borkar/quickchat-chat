import { useEffect, useState } from 'react';
import './App.css';
import { ChatArea } from './components/ChatArea';
import { Sidebar } from './components/Sidebar';
import api from './lib/axios';
import type { ConversationT, MessageT } from './types';
import { useSocket } from './hooks/useSocket';
import { useSelectedConversation } from './store/useSelectedConversation';

function App() {
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<ConversationT[]>([]);
  const { selectedConversation } = useSelectedConversation();
  const { sendMessage } = useSocket(appendMessage);

  function appendMessage(msg: MessageT) {
    setMessages((prev) => {
      const list = [...prev];
      list.push(msg);
      return list;
    });
  }

  async function getconversations() {
    const result = await api.get<ConversationT[]>('/chat/conversationsList');
    setConversations(result.data);
    console.log(result);
  }

  function onSend() {
    if (selectedConversation) {
      const senderid = selectedConversation?.otherUserId;
      sendMessage(senderid, input);
    }
  }

  const fetchMessages = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let url = `/chat/messages?conversationId=${selectedConversation?.conversationId}`;

      if (cursor) {
        url += `&parsedCursor=${cursor}`;
      }

      const data = (await api.get(url)).data.reverse();
      console.log(conversations, ' conversations');

      console.log(data);

      if (data.length > 0) {
        // Append older messages at top
        setMessages((prev) => [...data, ...prev]);

        // Set next cursor (oldest message timestamp)
        const lastMessage = data[data.length - 1];
        setCursor(lastMessage.createdAt);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // const sendMessage = () => {
  //   const text = input.trim();
  //   if (!text) return;
  //   const newMsg = {
  //     id: Date.now(),
  //     me: true,
  //     text,
  //     time: 'Just now',
  //     read: false,
  //   };
  //   setConversations((prev) => ({
  //     ...prev,
  //     [activeId]: [...(prev[activeId] ?? []), newMsg],
  //   }));
  //   setInput('');
  //   setIsTyping(true);
  //   setTimeout(() => {
  //     setIsTyping(false);
  //     const replyText =
  //       AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
  //     const reply = {
  //       id: Date.now() + 1,
  //       me: false,
  //       text: replyText,
  //       time: 'Just now',
  //       read: true,
  //     };
  //     setConversations((prev) => ({
  //       ...prev,
  //       [activeId]: [...(prev[activeId] ?? []), reply],
  //     }));
  //   }, 1800);
  // };

  useEffect(() => {
    getconversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation]);

  return (
    <>
      <div className='app'>
        <Sidebar
          contacts={conversations}
          activeId={activeId}
          search={search}
          onSearchChange={setSearch}
          onSelectContact={setActiveId}
        />
        <ChatArea
          contact={selectedConversation}
          messages={messages}
          isTyping={isTyping}
          input={input}
          onInputChange={setInput}
          onSend={onSend}
        />
        {/* {activeContact && (
          <InfoPanel contact={activeContact} messages={activeMessages} />
        )} */}
      </div>
    </>
  );
}

export default App;
