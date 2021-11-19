import { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Example } from '../../pages/Example/Example';
import { Home } from '../../pages/Home/Home';
import { Tables } from '../../pages/Tables/Tables';
import { Sidebar } from '../Navigation/Sidebar';
import { Topbar } from '../Navigation/Topbar';

export const App: React.FunctionComponent = () => {
  const { loadClient } = useActions().example

  useEffect(() => {
    loadClient()
  }, [loadClient])

  return (
      <Router basename="/admin">
        <div className="h-screen">
          <Topbar />
          <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
            <Sidebar />
            <div className="flex-grow overflow-y-auto">
              <div className="container md:max-w-full">
              {/* Content Start */}
              <Switch>
                <Route exact path="/tables" component={Tables} />
                <Route exact path="/example" component={Example} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
              {/* Content End */}
              </div>
            </div>
          </div>
        </div>
      </Router>
  )
}
