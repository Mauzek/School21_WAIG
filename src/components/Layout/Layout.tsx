import { FC } from "react";
import { Header } from "../Header/Header";
import { useStore } from "../../store/app-store";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getJWT, getUser, getUsername} from "../../API/api-utils";

const Layout: FC = () => {
  const { updateUserStore,user,setToken } = useStore();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getJWT();
      const username = getUsername();
      if (token) {
        try {
          const totaluser = username&&await getUser(username, token);
          updateUserStore(totaluser);
          setToken(token);
        } catch (error) {
          console.error("Ошибка при получении пользователя:", error);
        }
      }
    };

    fetchUser(); 
  }, []);
  return (
    <>
      {user&&(location.pathname !== '/Auth' && location.pathname !== '/auth') && <Header user={user} />}
      <Outlet />
    </>
  );
};

export default Layout;
