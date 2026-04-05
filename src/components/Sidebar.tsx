import type { ContactT } from '../types';
import { ContactItem } from './ContactItem';
import { SidebarFooter } from './SidebarFooter';

type SidebarProps = {
  contacts: ContactT[];
  activeId: number;
  search: string;
  onSearchChange: (search: string) => void;
  onSelectContact: (id: number) => void;
};

export function Sidebar({
  contacts,
  activeId,
  search,
  onSearchChange,
  onSelectContact,
}: SidebarProps) {
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className='section-label'>Direct Messages</div>
      <div className='contact-list'>
        {filtered.map((c) => (
          <ContactItem
            key={c.id}
            contact={c}
            isActive={activeId === c.id}
            onClick={() => onSelectContact(c.id)}
          />
        ))}
      </div>
      <SidebarFooter />
    </div>
  );
}
