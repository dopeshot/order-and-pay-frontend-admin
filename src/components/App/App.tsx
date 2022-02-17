import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { Allergens } from '../../pages/Allergens/Allergens';
import { Dishes } from '../../pages/Dishes/Dishes';
import { Home } from '../../pages/Home/Home';
import { Labels } from '../../pages/Labels/Labels';
import { Tables } from '../../pages/Tables/Tables';
import { Sidebar } from '../Navigation/Sidebar';
import { Topbar } from '../Navigation/Topbar';

export const App: React.FunctionComponent = () => {

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
              <Route exact path="/home" component={Home} />
              <Route exact path="/menus/labels" component={Labels} />
              <Route exact path="/menus/allergens" component={Allergens} />
              <Route path="/menus/:menusId/categories/:categoriesId/dish/:dishId" component={Dishes} />
              <Route path="/menus/:menusId/categories/:categoriesId/dish" component={Dishes} />
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
