import axios from "axios";
import { endpoints } from "./config";
import { useStore } from "zustand";
import { User } from "../types";


 export const isResponseOk = (response: Response | Error): response is Response => {
   return !(response instanceof Error);
 };


export const getData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error('Ошибка получения данных')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

export const getUser = async (login: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getUser(login), {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    const normalizedData = normalizeUserData(response.data);
    return normalizedData;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const authorize = async (url: string, data: { username: string; password: string }) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;    // tokens
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const setJWT = (jwt:string) => {
  document.cookie = `jwt=${jwt}`
  localStorage.setItem('jwt', jwt)
}

export const getJWT = () => {
  if (document.cookie === '') {
    return localStorage.getItem('jwt')
  }
  const jwt = document.cookie.split(';').find((item) => item.includes('jwt'))
  return jwt ? jwt.split('=')[1] : null
}

export const removeJWT = () => {
  document.cookie = 'jwt=;'
  localStorage.removeItem('jwt')
}

interface UserDataFromServer {
  id: string;
  age: number;
  birthday: string;
  description: string | null;
  email: string;
  firstname: string;
  lastname: string;
  patronymic: string | null;
  profileImageId: string | null;
  tgName: string | null;
  username: string;
  gender: string;
  isAdmin: boolean;
}

const normalizeUserData = (user: UserDataFromServer): User => {
  return {
    id: user.id ?? "",
    username: user.username,
    birthday: user.birthday ? new Date(user.birthday) : "",
    description: user.description ?? "",
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    patronymic: user.patronymic ?? "",
    gender: user.gender,
    isAdmin: user.isAdmin,
    profileImageId: user.profileImageId ?? "",
    tgName: user.tgName ?? "",
    age:  user.age,

  };
};



export const getUserInterests = async (url: string,token:string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;   
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

// export const getAllUsers = async (token:string) => {
//   try {
//     const response = await axios.get(endpoints.adminGetAllUsers, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;   
//   } catch (error) {
//     console.error("Ошибка при получении данных пользователя:", error);
//     throw error;
//   }
// };
export const getAllUsers = async (token:string) => {
  try {
    const response = await axios.get(endpoints.adminGetAllUsers, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Corrected formatting here
      },
    });
// return response.data;
    return response.data.map(normalizeUsersData); // Apply normalization here
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};


interface UsersDataFromServer {
  id: string;
  age: number;
  birthDay: string;
  description: string | null;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  profileImageId: string | null;
  tgName: string | null;
  userName: string;
  gender: string;
  isAdmin: boolean;
}

const normalizeUsersData = (user: UsersDataFromServer)=> {
  return {
    id: user.id ?? "",
    username: user.userName,
    birthday: user.birthDay ? new Date(user.birthDay).toLocaleDateString('en-US') : "",
    description: user.description ?? "",
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic ?? "",
    gender: user.gender,
    isAdmin: user.isAdmin,
    profileImageId: user.profileImageId ?? "",
    tgName: user.tgName ?? "",
    age:  user.age,

  };
};