// import { Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/Home";
// import GroupsPage from "./pages/Groups/[slug]";
// import FriendsPage from "./pages/Friends/[slug]";
// import ProfilePage from "./pages/Profile/[login]";
// import AdminPage from "./pages/Admin";
// import { useStore } from "./store/app-store";
// import NotFoundPage from "./pages/NotFound/NotFound";
// import GroupPage from "./pages/Group/[id]";
// import AuthPage from "./pages/Auth";
// import Layout from "./components/Layout/Layout";

// function App() {
//   const { user } = useStore();

//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path="/" element={<Navigate to="/Auth" />} />
//         <Route path="Auth" element={<AuthPage />} />
//         <Route path="Home" element={<HomePage />} />

//         <Route path="Groups" element={<Navigate to="/Groups/All" />} />
//         <Route path="Groups" element={<GroupsPage />}>
//           <Route path="All" element={<GroupsPage />} />
//           <Route path="Subscriptions" element={<GroupsPage />} />
//           <Route path="Managed" element={<GroupsPage />} />
//           <Route path="Create" element={<GroupsPage />} />
//         </Route>

//         <Route path="Friends" element={<Navigate to="/Friends/All" />} />
//         <Route path="Friends" element={<FriendsPage />}>
//           <Route path="All" element={<FriendsPage />} />
//           <Route path="Requests" element={<FriendsPage />} />
//         </Route>

//         <Route path="Profile/:username" element={<ProfilePage />}>
//           <Route path="Privacy" element={<ProfilePage />} />
//           <Route path="Edit" element={<ProfilePage />} />
//         </Route>

//         <Route path="Group/:id" element={<GroupPage />}>
//           <Route path="Main" element={<GroupPage />} />
//           <Route path="Members" element={<GroupPage />} />
//           <Route path="Edit" element={<GroupPage />} />
//         </Route>

//         <Route path="Admin" element={<Navigate to="/Admin/Users" />} />
//         <Route
//           path="Admin/Users"
//           element={
//             user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
//           }
//         />
//         <Route
//           path="Admin/Groups"
//           element={
//             user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
//           }
//         />
//         <Route
//           path="Admin/Interests"
//           element={
//             user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
//           }
//         />
//         <Route
//           path="Admin/Statistic"
//           element={
//             user.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
//           }
//         />

//         <Route path="*" element={<NotFoundPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import GroupsPage from "./pages/Groups/[slug]";
import FriendsPage from "./pages/Friends/[slug]";
import ProfilePage from "./pages/Profile/[login]";
import AdminPage from "./pages/Admin";
import NotFoundPage from "./pages/NotFound/NotFound";
import GroupPage from "./pages/Group/[id]";
import AuthPage from "./pages/Auth";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useStore } from "./store/app-store";

function App() {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/Auth" />} />
        <Route path="Auth" element={<AuthPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="Home" element={<HomePage />} />

          <Route path="Groups" element={<Navigate to="/Groups/All" />} />
          <Route path="Groups" element={<GroupsPage />}>
            <Route path="All" element={<GroupsPage />} />
            <Route path="Subscriptions" element={<GroupsPage />} />
            <Route path="Managed" element={<GroupsPage />} />
            <Route path="Create" element={<GroupsPage />} />
          </Route>

          <Route path="Friends" element={<Navigate to="/Friends/All" />} />
          <Route path="Friends" element={<FriendsPage />}>
            <Route path="All" element={<FriendsPage />} />
            <Route path="Requests" element={<FriendsPage />} />
          </Route>

          <Route path="Profile/:username" element={<ProfilePage />}>
            <Route path="Privacy" element={<ProfilePage />} />
            <Route path="Edit" element={<ProfilePage />} />
          </Route>

          <Route path="Group/:id" element={<GroupPage />}>
            <Route path="Main" element={<GroupPage />} />
            <Route path="Members" element={<GroupPage />} />
            <Route path="Edit" element={<GroupPage />} />
          </Route>

          <Route path="Admin" element={<Navigate to="/Admin/Users" />} />
          <Route
            path="Admin/Users"
            element={
              user?.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
          <Route
            path="Admin/Groups"
            element={
              user?.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
          <Route
            path="Admin/Interests"
            element={
              user?.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
          <Route
            path="Admin/Statistic"
            element={
              user?.isAdmin ? <AdminPage /> : <Navigate to="/Home" replace />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
