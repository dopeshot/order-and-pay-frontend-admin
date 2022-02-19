import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { Login } from '../../pages/Login/Login';
import { Admin } from './Admin';
import { PrivateRoute } from './PrivateRoute';

export const App: React.FunctionComponent = () => {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="login" />
        </Route>
      </Switch>
    </Router >
  )
}

