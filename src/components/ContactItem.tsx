import type { ContactT } from '../types';
import { Avatar } from './Avatar';

type ContactItemProps = {
  contact: ContactT;
  isActive: boolean;
  onClick: () => void;
};

export function ContactItem({ contact, isActive, onClick }: ContactItemProps) {
  return (
    <div
      className={`contact-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Avatar
        name={contact.emoji}
        color={contact.color}
        status={contact.status}
      />
      <div className='contact-info'>
        <div className='contact-name'>{contact.name}</div>
        <div className='contact-preview'>{contact.preview}</div>
      </div>
      <div className='contact-meta'>
        <span className='contact-time'>{contact.time}</span>
        {contact.unread > 0 && (
          <span className='unread-badge'>{contact.unread}</span>
        )}
      </div>
    </div>
  );
}
