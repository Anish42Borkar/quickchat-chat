import { useState } from 'react';
import './App.css';
import { ChatArea } from './components/ChatArea';
import { Sidebar } from './components/Sidebar';

function App() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <>
      <div className='app'>
        <Sidebar />
        <ChatArea isTyping={isTyping} />
        {/* {activeContact && (
          <InfoPanel contact={activeContact} messages={activeMessages} />
        )} */}
      </div>
    </>
  );
}

export default App;
