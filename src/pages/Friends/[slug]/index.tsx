
import { useLocation } from 'react-router-dom'

const FriendsPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Friends Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default FriendsPage