import { FC } from 'react'
import { useLocation } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Not Found Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default NotFoundPage;