
import { useLocation } from 'react-router-dom';

const GroupPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Group Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default GroupPage;