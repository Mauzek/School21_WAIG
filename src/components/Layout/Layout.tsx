import { FC } from "react";
import { Header } from "../Header/Header";
import { useStore } from "../../store/app-store";
import { Outlet, useLocation } from "react-router-dom";

const Layout: FC = () => {
    const { user } = useStore();
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/Auth' && <Header user={user} />}
            <Outlet />
        </>
    );
};

export default Layout;
