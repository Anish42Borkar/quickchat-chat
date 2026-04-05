import { useRef, type ChangeEvent, type KeyboardEvent } from 'react';

type MessageInputProps = {
  value: string;
  onChange: (data: string) => void;
  onSend: () => void;
  placeholder: string;
};

export function MessageInput({
  value,
  onChange,
  onSend,
  placeholder,
}: MessageInputProps) {
  const ref = useRef(null);
  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
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
          value={value}
          onChange={handleChange}
          onKeyDown={handleKey}
          rows={1}
        />
        <button className='input-icon-btn'>🎤</button>
        <button className='send-btn' onClick={onSend} disabled={!value.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
}
