import type { ContactT } from '../types';

type ProfileSectionProps = {
  contact: ContactT;
};

export function ProfileSection({ contact }: ProfileSectionProps) {
  return (
    <div className='profile-section'>
      <div className='profile-avatar' style={{ background: contact.color }}>
        <div className='profile-avatar-ring' />
        {contact.emoji}
      </div>
      <div className='profile-name'>{contact.name}</div>
      <div className='profile-handle'>{contact.handle}</div>
      <div className='profile-bio'>{contact.bio}</div>
      <div className='info-actions'>
        <button className='info-action-btn primary'>Message</button>
        <button className='info-action-btn'>Profile</button>
      </div>
    </div>
  );
}
