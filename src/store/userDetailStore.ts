import { create } from 'zustand';
import type { UserDetail } from '../types';

type UserDetailsProps = {
  userDetail: UserDetail | null;
  clearUserDetails: () => void;
  updateUserDetails: (data: UserDetail | null) => void;
};

export const useUserDetails = create<UserDetailsProps>((set) => ({
  userDetail: null,
  clearUserDetails: () => set({ userDetail: null }),
  updateUserDetails: (data) => set({ userDetail: data }),
}));
