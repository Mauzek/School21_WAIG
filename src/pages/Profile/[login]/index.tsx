import { FC } from 'react'
import { useLocation } from 'react-router-dom';

const ProfilePage: FC = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Profile Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default ProfilePage;