import { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Example } from '../../pages/Example/Example';
import { Home } from '../../pages/Home/Home';
import { Navigation } from '../Navigation/Navigation';

export const App: React.FunctionComponent = () => {
  const { loadClient } = useActions().example

    useEffect(() => {
      loadClient()
    }, [loadClient])
  
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/example" component={Example} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}
