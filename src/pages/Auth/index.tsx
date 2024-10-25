import { useLocation } from 'react-router-dom'

const AuthPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Auth Page</h2>
      <p>{location.pathname}</p>
    </div>
  )
}

export default AuthPage