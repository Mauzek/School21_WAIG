import { getJWT } from '../../API/api-utils'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = getJWT();
    return (
    token ? <Outlet/> : <Navigate to="/Auth" replace/>
  )
}

export default PrivateRoute