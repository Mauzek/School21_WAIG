import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import GroupsPage from "./pages/Groups/[slug]";
import FriendsPage from "./pages/Friends/[slug]";
import ProfilePage from "./pages/Profile/[login]";
import AdminPage from "./pages/Admin";
import { useStore } from "./store/app-store";
import NotFoundPage from "./pages/NotFound/NotFound";
import GroupPage from "./pages/Group/[id]";
import AuthPage from "./pages/Auth";
import Layout from "./components/Layout/Layout";

function App() {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to='/Auth'/>}/>
        <Route path="Auth" element={<AuthPage />} />
        <Route path="Home" element={<HomePage />} />
        
        <Route path="Groups" element={<Navigate to="/Groups/All" />} />
        <Route path="Groups/:slug" element={<GroupsPage />}>
          <Route path="All" element={<GroupsPage />} />
          <Route path="My" element={<GroupsPage />} />
          <Route path="Managed" element={<GroupsPage />} />
        </Route>

        <Route path="Friends" element={<Navigate to="/Friends/All" />} />
        <Route path="Friends/:slug" element={<FriendsPage />} />

        <Route path="Profile/:login" element={<ProfilePage />}>
          <Route path="Privacy" element={<ProfilePage />} />
          <Route path="Edit" element={<ProfilePage />} />
        </Route>

        <Route path="Group/:id" element={<GroupPage />}>
          <Route path="Main" element={<GroupPage />} />
          <Route path="Users" element={<GroupPage />} />
          <Route path="Edit" element={<GroupPage />} />
        </Route>

        <Route path="Admin" element={<Navigate to="/Admin/Users" />} />
        <Route
          path="Admin/Users"
          element={
            user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
          }
        />
        <Route
          path="Admin/Groups"
          element={
            user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
          }
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
