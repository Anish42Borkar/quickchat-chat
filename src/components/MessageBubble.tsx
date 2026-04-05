import type { ConversationT } from '../types';

type MessageBubbleProps = {
  message: ConversationT;
  showAvatar: boolean;
  showMeta: boolean;
  avatarColor: string;
  avatarEmoji: string;
};

export function MessageBubble({
  message,
  showAvatar,
  showMeta,
  avatarColor,
  avatarEmoji,
}: MessageBubbleProps) {
  const side = message.me ? 'me' : 'them';
  return (
    <div className={`msg-row ${side}`}>
      {!message.me && (
        <div
          className={`msg-avatar ${showAvatar ? '' : 'hidden'}`}
          style={{ background: avatarColor }}
        >
          {avatarEmoji}
        </div>
      )}
      <div className='msg-group'>
        <div className={`bubble ${side}`}>{message.text}</div>
        {showMeta && (
          <div className='msg-meta'>
            <span>{message.time}</span>
            {message.me && <span className='read-tick'>✓✓</span>}
          </div>
        )}
      </div>
    </div>
  );
}
