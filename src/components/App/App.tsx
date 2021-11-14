import { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Example } from '../../pages/Example/Example';
import { Home } from '../../pages/Home/Home';
import { Tables } from '../../pages/Tables/Tables';
import { Navigation } from '../Navigation/Navigation';

export const App: React.FunctionComponent = () => {
  const { loadClient } = useActions().example

  useEffect(() => {
    loadClient()
  }, [loadClient])

  return (
    <Router basename="/admin">
      <Navigation />
      { /* JS: Margin Needs to be there because of sidenav, container set global because we only need it when there is the mobile nav */ }
      <div className="md:ml-60 md:pt-20">
        <div className="container md:max-w-full">
          <Switch>
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/example" component={Example} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}
