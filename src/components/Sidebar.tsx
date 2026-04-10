import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useUserDetails } from '../store/userDetailStore';
import { useSelectedConversation } from '../store/useSelectedConversation';
import type { ConversationT } from '../types';
import { ContactItem } from './ContactItem';
import { SidebarFooter } from './SidebarFooter';

type SidebarProps = {
  contacts: ConversationT[];
  activeId: number;
  onSelectContact: (id: number) => void;
};

export function Sidebar({ contacts, activeId, onSelectContact }: SidebarProps) {
  const [conversations, setConversations] = useState<ConversationT[]>([]);
  const [search, setSearch] = useState('');

  const { userDetail } = useUserDetails();
  const { updateSelectedConversation } = useSelectedConversation();

  const filtered = conversations.filter((c) =>
    c.otherUserName.toLowerCase().includes(search.toLowerCase()),
  );

  async function getconversations() {
    const result = await api.get<ConversationT[]>('/chat/conversationsList');
    setConversations(result.data);
    console.log(result);
  }

  useEffect(() => {
    getconversations();
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <span className='logo'>Pulse</span>
        <button className='compose-btn'>✏️</button>
      </div>
      <div className='search-wrap'>
        <div className='search-wrap-inner'>
          <span className='search-icon'>🔍</span>
          <input
            className='search-input'
            placeholder='Search conversations...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className='section-label'>Direct Messages</div>
      <div className='contact-list'>
        {filtered.map((c) => (
          <ContactItem
            key={c.conversationId}
            contact={c}
            // isActive={activeId === c.}
            onClick={() => {
              updateSelectedConversation(c);
              onSelectContact(c.conversationId);
            }}
          />
        ))}
      </div>
      <SidebarFooter />
    </div>
  );
}
