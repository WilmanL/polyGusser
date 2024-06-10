import { useAuth } from 'react-auth-kit'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children, ...props}) {
  const auth = useAuth()

  return (
    <Route {...props}>
      {auth.isAuth() ? children : <Navigate to="/polyguesser/login" />}
    </Route>
  )
}