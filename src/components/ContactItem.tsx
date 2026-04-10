import type { ConversationT } from '../types';
import { Avatar } from './Avatar';

type ContactItemProps = {
  contact: ConversationT;
  isActive?: boolean;
  onClick: () => void;
};

export function ContactItem({
  contact,
  isActive = true,
  onClick,
}: ContactItemProps) {
  const now = new Date(contact.updatedAt);
  return (
    <div
      className={`contact-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Avatar name={contact.otherUserName} color={'green'} status={'Active'} />
      <div className='contact-info'>
        <div className='contact-name'>{contact.otherUserName}</div>
        <div className='contact-preview'>{contact?.lastMessage}</div>
      </div>
      <div className='contact-meta'>
        <span className='contact-time'>{now.toLocaleTimeString('en-US')}</span>
        {/* {contact.unread > 0 && (
          <span className='unread-badge'>{contact.unread}</span>
        )} */}
      </div>
    </div>
  );
}
