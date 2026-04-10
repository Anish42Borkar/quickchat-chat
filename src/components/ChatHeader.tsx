import type { ConversationT } from '../types';
import { Avatar } from './Avatar';

type ChatHeader = {
  contact: ConversationT;
};
export function ChatHeader({ contact }: ChatHeader) {
  // const label =
  //   contact.status === 'online'
  //     ? 'Active now'
  //     : contact.status === 'away'
  //       ? 'Away'
  //       : 'Offline';
  return (
    <div className='chat-header'>
      <Avatar
        // name={contact.emoji}
        // color={contact.color}
        name={'contact.emoji'}
        color={'contact.color'}
        size={40}
        radius={13}
        status={'contact.status'}
        // status={contact.status}
      />

      <div className='chat-header-info'>
        <div className='chat-header-name'>{contact.otherUserName}</div>
        <div className={`chat-header-status ${contact.otherUserId}`}>
          <span className='pulse' />
          {/* {label} */}
          {'test'}
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
