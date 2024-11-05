import { create } from "zustand";
import { User } from "../types";
import { avatars } from "../assets/images/avatars/avatars";

interface StoreState {
  isAuth: boolean;
  user: User;
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
}

export const useStore = create<StoreState>((set) => ({
  isAuth: true,
  user: {
    id: "1",
    username: "mauzek",
    birthday: "1999/05/01",
    description: "Парень симпотяга по жизни бродяга",
    email: "artemilliy@gmail.com",
    firstname: "Артём",
    lastname: "Иллий",
    patronymic: "Андреевич",
    gender: "Male",
    isAdmin: true,
    tgName: "tralebys",
    profileImageId: "stitch",
    age: 24
    // id: "",
    // username: "",
    // birthday: "",
    // description: "",
    // email: "",
    // firstName: "",
    // lastName: "",
    // patronymic: "",
    // gender: "",
    // isAdmin: true,
    // tgName: "",
    // profileImageId: "",
  },
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXV6ZWsiLCJleHAiOjE3MzA5MDk3MDV9.vMVYjjjEsE_aD0_TWrfceWthSGjzvVrKPbkrwBfCD3ZBbv7qZT0JaiAhVYLJlGLksXXyhC8YFQ8LODmkkN5uAQ",
  setAvatar: (avatarId) =>
    set((state) => ({
      user: { ...state.user, profileImageId: avatarId },
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
      user: {
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
}));
