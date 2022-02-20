import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Admin } from './Admin';
import { GuestRoute } from './GuestRoute';
import { PrivateRoute } from './PrivateRoute';

/**
 * Router
 */
export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <GuestRoute path="/login" >
          <Login />
        </GuestRoute>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router >
  )
}

