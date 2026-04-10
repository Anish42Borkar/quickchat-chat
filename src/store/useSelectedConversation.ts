import { create } from 'zustand';
import type { ConversationT, UserT } from '../types';

type SelectedConversationProps = {
  selectedConversation: ConversationT | null;
  updateSelectedConversation: (data: ConversationT | null) => void;
};

export const useSelectedConversation = create<SelectedConversationProps>(
  (set) => ({
    selectedConversation: null,
    updateSelectedConversation: (data) => set({ selectedConversation: data }),
  }),
);
