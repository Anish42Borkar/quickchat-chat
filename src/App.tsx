import { useState } from 'react';
import './App.css';
import { AUTO_REPLIES, CONTACTS, INITIAL_CONVERSATIONS } from './data';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { InfoPanel } from './components/InfoPanel';
import type { ConversationT } from './types';

function App() {
  const [activeId, setActiveId] = useState(1);
  const [conversations, setConversations] = useState<
    Record<number, ConversationT[]>
  >(INITIAL_CONVERSATIONS);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState('');

  const activeContact = CONTACTS.find((c) => c.id === activeId);
  const activeMessages = conversations[activeId] ?? [];

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      id: Date.now(),
      me: true,
      text,
      time: 'Just now',
      read: false,
    };
    setConversations((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), newMsg],
    }));
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyText =
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const reply = {
        id: Date.now() + 1,
        me: false,
        text: replyText,
        time: 'Just now',
        read: true,
      };
      setConversations((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] ?? []), reply],
      }));
    }, 1800);
  };

  return (
    <>
      <div className='app'>
        <Sidebar
          contacts={CONTACTS}
          activeId={activeId}
          search={search}
          onSearchChange={setSearch}
          onSelectContact={setActiveId}
        />
        <ChatArea
          contact={activeContact}
          messages={activeMessages}
          isTyping={isTyping}
          input={input}
          onInputChange={setInput}
          onSend={sendMessage}
        />
        {/* {activeContact && (
          <InfoPanel contact={activeContact} messages={activeMessages} />
        )} */}
      </div>
    </>
  );
}

export default App;
