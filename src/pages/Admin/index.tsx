import { useLocation,} from 'react-router-dom';
import { Users } from '../../components/Admin/Users/Users';
import { Groups } from '../../components/Admin/Groups/Groups';
import styles from "./Admin.module.css"
import { Interests } from '../../components/Admin/Interests/Interests';
import { Statistic } from '../../components/Admin/Statistic/Statistic';

const AdminPage = () => {
  const location = useLocation();
  return (
    <main className={styles.admin__container}>
      <h2>Admin Page</h2>
      <p>{location.pathname}</p>
{location.pathname=="/Admin/Users"&&<Users/>}
{location.pathname=="/Admin/Groups"&&<Groups/>}
{location.pathname=="/Admin/Interests"&&<Interests/>}
{location.pathname=="/Admin/Statistic"&&<Statistic/>}
    </main>
  );
};

export default AdminPage;
