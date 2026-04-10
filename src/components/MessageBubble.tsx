import { useUserDetails } from '../store/userDetailStore';
import type { MessageT } from '../types';

type MessageBubbleProps = {
  message: MessageT;
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
  const { userDetail } = useUserDetails();

  // const side = message.me ? 'me' : 'them';
  const side = message.senderId === userDetail?.userId ? 'me' : 'them';

  return (
    <div className={`msg-row ${side}`}>
      {!side && (
        <div
          className={`msg-avatar ${showAvatar ? '' : 'hidden'}`}
          style={{ background: avatarColor }}
        >
          {avatarEmoji}
        </div>
      )}
      <div className='msg-group'>
        <div className={`bubble ${side}`}>{message.content}</div>
        {showMeta && (
          <div className='msg-meta'>
            {/* <span>{message.time}</span>
            {message.me && <span className='read-tick'>✓✓</span>} */}
          </div>
        )}
      </div>
    </div>
  );
}
