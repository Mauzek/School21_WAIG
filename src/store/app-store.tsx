import { create } from "zustand";
import { User } from "../types";
import { avatars } from "../assets/images/avatars/avatars";

interface StoreState {
  isAuth: boolean;
  user: User | null;
  token: string;
  setAvatar: (avatarId: keyof typeof avatars) => void;
  setMainInfo: (
    firstName: string,
    lastName: string,
    patronymic: string,
    gender: string,
    tgName: string,
    birthday: Date | string,
    description: string
  ) => void;
  updateUserStore: (updatedUser: any) => void;
  setToken: (newToken: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  isAuth: true,
  user: null,
  token:
    "",
  setAvatar: (avatarId) =>
    set((state) => ({
      user: state.user&&{ ...state.user, profileImageId: avatarId },
    })),
  setMainInfo: (
    firstName,
    lastName,
    patronymic,
    gender,
    tgName,
    birthday,
    description
  ) => {
    set((state) => ({
      user:state.user&& {
        ...state.user,
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic,
        gender: gender,
        tgName: tgName,
        birthday: birthday,
        description: description,
      },
    }));
  },
  updateUserStore: (updatedUser) =>
    set((state) => ({
      user: {  ...state.user ,...updatedUser},
    })),
    setToken: (newToken) => set({ token: newToken })
}));
