import type { ContactT } from '../types';
import { Avatar } from './Avatar';

type ChatHeader = {
  contact: ContactT;
};
export function ChatHeader({ contact }: ChatHeader) {
  const label =
    contact.status === 'online'
      ? 'Active now'
      : contact.status === 'away'
        ? 'Away'
        : 'Offline';
  return (
    <div className='chat-header'>
      <Avatar
        name={contact.emoji}
        color={contact.color}
        size={40}
        radius={13}
        status={contact.status}
      />
      <div className='chat-header-info'>
        <div className='chat-header-name'>{contact.name}</div>
        <div className={`chat-header-status ${contact.status}`}>
          <span className='pulse' />
          {label}
        </div>
      </div>
      <div className='header-actions'>
        <button className='icon-btn'>📞</button>
        <button className='icon-btn'>🎥</button>
        <button className='icon-btn'>⋯</button>
      </div>
    </div>
  );
}
