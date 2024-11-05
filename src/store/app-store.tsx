import { create } from "zustand";
import { User } from "../types";
import { avatars } from "../assets/images/avatars/avatars";

interface StoreState {
  isAuth: boolean;
  user: User;
  setAvatar: (avatarId: keyof typeof avatars) => void,
  updateUserStore: (updatedUser: any) => void;
}

export const useStore = create<StoreState>((set) => ({
  isAuth: true,
  user: {
    id: "",
    username: "",
    birthday: "",
    description: "",
    email: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    gender: "",
    isAdmin: true,
    tgName: "",
    profileImageId: "",
  },
  setAvatar: (avatarId) =>
    set((state) => ({
      user: { ...state.user, profileImageId: avatarId },
    })),
  updateUserStore: (updatedUser) =>
    set((state) => ({
      user: {  ...state.user ,...updatedUser},
    })),
}));
