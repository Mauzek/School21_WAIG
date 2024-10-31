import { useLocation,} from 'react-router-dom';

const AdminPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Admin Page</h2>
      <p>{location.pathname}</p>
    </div>
  );
};

export default AdminPage;
