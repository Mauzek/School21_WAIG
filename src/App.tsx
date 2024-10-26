import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import HomePage from "./pages/Home";
import GroupsPage from "./pages/Groups/[slug]";
import FriendsPage from "./pages/Friends/[slug]";
import ProfilePage from "./pages/Profile/[id]";
import AdminPage from "./pages/Admin";
import { useStore } from "./store/app-store";
import NotFoundPage from "./pages/NotFound/NotFound";
import GroupPage from "./pages/Group/[id]";
import AuthPage from "./pages/Auth"; // Страница авторизации

function App() {
  const { user } = useStore();
  const location = useLocation();

  return (
    <>
        {location.pathname !== "/auth" && <Header user={user} />}
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Group/:id/Main" element={<GroupPage />} />
          <Route path="/Groups/:slug" element={<GroupsPage />} />
          <Route path="/Friends/:slug" element={<FriendsPage />} />
          <Route path="/Profile/:id" element={<ProfilePage />} />
          <Route path="/Profile/:id/Privacy" element={<ProfilePage />} />
          <Route path="/Profile/:id/Edit" element={<ProfilePage />} />
          <Route path="/Groups" element={<Navigate to="/Groups/All" />} />
          <Route path="/Friends" element={<Navigate to="/Friends/All" />} />
          <Route path="/Admin" element={<Navigate to="/Admin/Users" />} />
          <Route
            path="/Admin/Users"
            element={
              user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
          <Route
            path="/Admin/Groups"
            element={
              user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  );
}

export default App;
