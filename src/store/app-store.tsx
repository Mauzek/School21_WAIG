import { create } from "zustand";
import { User } from "../types";
import { avatars } from "../assets/images/avatars/avatars";

interface StoreState {
  isAuth: boolean;
  user: User;
  setAvatar: (avatarId: keyof typeof avatars) => void;
}

export const useStore = create<StoreState>((set) => ({
  isAuth: true,
  user: {
    id: "1",
    username: "Morganfriman",
    birthday: "10.10.2001",
    description: "Парень симпотяга по жизни бродяга",
    email: "alesha@mail.ru",
    firstName: "Алёша",
    lastName: "Бойкин",
    patronymic: "Башмакович",
    gender: "М",
    isAdmin: true,
    tgName: "kakaTV",
    profileImageId: "stitch",
  },
  setAvatar: (avatarId) =>
    set((state) => ({
      user: { ...state.user, profileImageId: avatarId },
    })),
}));
