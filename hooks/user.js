import { create } from 'zustand';

export const userProfile = create((set) => ({
    profile: null,
    setProfile: (newProfile) => set({ profile: newProfile }),
}));
