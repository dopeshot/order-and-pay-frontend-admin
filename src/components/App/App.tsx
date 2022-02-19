import { useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Login } from '../../pages/Login/Login';
import { Admin } from './Admin';

export const App: React.FunctionComponent = () => {
  const { initializeUser } = useActions().auth

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/">
          <Redirect to="login" />
        </Route>
      </Switch>
    </Router >
  )
}

