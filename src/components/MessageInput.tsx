import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useSelectedConversation } from '../store/useSelectedConversation';

type MessageInputProps = {
  placeholder: string;
};

export function MessageInput({ placeholder }: MessageInputProps) {
  const ref = useRef(null);

  const { sendMessage } = useSocket();
  const { selectedConversation } = useSelectedConversation();
  const [input, setInput] = useState('');

  function onSend() {
    if (selectedConversation) {
      const senderid = selectedConversation?.otherUserId;
      sendMessage(senderid, input);
      setInput('');
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };
  return (
    <div className='input-area'>
      <div className='input-wrap'>
        <div className='input-actions-left'>
          <button className='input-icon-btn'>📎</button>
          <button className='input-icon-btn'>😊</button>
        </div>
        <textarea
          ref={ref}
          className='msg-input'
          placeholder={placeholder ?? 'Type a message…'}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKey}
          rows={1}
        />
        <button className='input-icon-btn'>🎤</button>
        <button className='send-btn' onClick={onSend} disabled={!input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
}
