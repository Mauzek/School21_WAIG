
import { useLocation } from 'react-router-dom';

const GroupsPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Groups Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default GroupsPage;