import { useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Allergens } from '../../pages/Allergens/Allergens';
import { Example } from '../../pages/Example/Example';
import { Home } from '../../pages/Home/Home';
import { Labels } from '../../pages/Labels/Labels';
import { Menus } from '../../pages/Menus/Menus';
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
          <div className="flex-1 overflow-y-auto">
            {/* Content Start */}
            <Switch>
              <Route exact path="/tables" component={Tables} />
              <Route exact path="/example" component={Example} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/menus" component={Menus} />
              <Route path="/menus/labels" component={Labels} />
              <Route path="/menus/allergens" component={Allergens} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
            {/* Content End */}
          </div>
        </div>
      </div>
    </Router>
  )
}
