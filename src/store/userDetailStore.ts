import { create } from 'zustand';
import type { UserT } from '../types';

type UserDetailsProps = {
  userDetail: UserT | null;
  clearUserDetails: () => void;
  updateUserDetails: (data: UserT | null) => void;
};

export const useUserDetails = create<UserDetailsProps>((set) => ({
  userDetail: null,
  clearUserDetails: () => set({ userDetail: null }),
  updateUserDetails: (data) => set({ userDetail: data }),
}));
