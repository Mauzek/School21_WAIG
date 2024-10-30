import { create } from "zustand";

export type User = {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  isAdmin: boolean;
  telegram: string;
  email: string;
  age: string;
  DescriptionsUser: string;
  gender: string;
}

interface StoreState {
  isAuth: boolean;
  user: User;
}

export const useStore = create<StoreState>((set) => ({
  isAuth: true,
  user: {
    id: '1',
    login: "Morganfriman",
    password: '111',
    firstName: 'Алёша',
    lastName: 'Бойкин',
    patronymic: 'Башмакович',
    isAdmin: false,
    telegram: 'kakaTV',
    email: 'alesha@mail.ru',
    age: "10.10.2001",
    DescriptionsUser: "Парень симпотяга по жизни бродяга",
    gender: 'М'
  },
}));
