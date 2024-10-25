import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const { user } = useStore();

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route index path="/" element={<Navigate to="/Home" />} />
        <Route index path="/Home" element={<HomePage />} />
        <Route path={"/Group/:id"} element={<GroupPage/>} />
        <Route path={"/Groups/:slug"} element={<GroupsPage />} />
        <Route path={"/Friends/:slug"} element={<FriendsPage />} />
        <Route path={`/Profile/:id`} element={<ProfilePage />} />
        <Route path={`/Profile/:id/Privacy`} element={<ProfilePage />} />
        <Route path={`/Profile/:id/Edit`} element={<ProfilePage />} />
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
