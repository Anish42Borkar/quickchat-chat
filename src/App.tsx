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

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  function onSend() {
    if (selectedConversation) {
      const senderid = selectedConversation?.otherUserId;
      sendMessage(senderid, input);
    }
  }

  return (
    <>
      <div className='app'>
        <Sidebar
          contacts={conversations}
          activeId={activeId}
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
