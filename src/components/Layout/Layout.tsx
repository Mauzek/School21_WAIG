import { FC, useEffect } from "react";
import { Header } from "../Header/Header";
import { useStore } from "../../store/app-store";
import { Outlet, useLocation } from "react-router-dom";
import { getJWT, getUser, isResponseOk } from "../../API/api-utils";
import { User } from "../../types";

const Layout: FC = () => {
  const { updateUserStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getJWT();
      if (token) {
        try {
          const totaluser = await getUser('admin3', token);
          updateUserStore(totaluser);
        } catch (error) {
          console.error("Ошибка при получении пользователя:", error);
        }
      }
    };

    fetchUser(); // Вызов функции для получения пользователя
  }, []);
  const { user } = useStore();
  return (
    <>
      {(location.pathname !== '/Auth' && location.pathname !== '/auth') && <Header user={user} />}
      <Outlet />
    </>
  );
};

export default Layout;
