import { MEDIA_COLORS, MEDIA_ICONS } from '../data';
import type { ConversationT } from '../types';
import { ProfileSection } from './ProfileSection';

type InfoPanelProps = { contact: any; messages: ConversationT[] };

export function InfoPanel({ contact, messages }: InfoPanelProps) {
  const statusColor =
    contact.status === 'online'
      ? 'var(--green)'
      : contact.status === 'away'
        ? 'var(--amber)'
        : 'var(--text3)';
  return (
    <div className='info-panel'>
      <ProfileSection contact={contact} />
      <div className='info-section'>
        <div className='info-section-title'>Details</div>
        <div className='info-stat'>
          <span className='info-stat-label'>Status</span>
          <span className='info-stat-value' style={{ color: statusColor }}>
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </span>
        </div>
        <div className='info-stat'>
          <span className='info-stat-label'>Messages</span>
          <span className='info-stat-value'>{messages.length}</span>
        </div>
        <div className='info-stat'>
          <span className='info-stat-label'>Since</span>
          <span className='info-stat-value'>Jan 2024</span>
        </div>
      </div>
      <div className='info-section' style={{ marginTop: 20 }}>
        <div className='info-section-title'>Shared Media</div>
        <div className='media-grid'>
          {MEDIA_ICONS.slice(0, 9).map((icon, i) => (
            <div
              key={i}
              className='media-thumb'
              style={{ background: MEDIA_COLORS[i % MEDIA_COLORS.length] }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
