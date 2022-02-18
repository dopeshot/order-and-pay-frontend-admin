import { useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { useActions } from '../../overmind';
import { Allergens } from '../../pages/Allergens/Allergens';
import { Dishes } from '../../pages/Dishes/Dishes';
import { Home } from '../../pages/Home/Home';
import { Labels } from '../../pages/Labels/Labels';
import { Login } from '../../pages/Login/Login';
import { MenuEditor } from '../../pages/Menus/MenuEditor';
import { Menus } from '../../pages/Menus/Menus';
import { Tables } from '../../pages/Tables/Tables';
import { Sidebar } from '../Navigation/Sidebar';
import { Topbar } from '../Navigation/Topbar';

export const App: React.FunctionComponent = () => {
  const { initializeUser } = useActions().auth

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return (
    <Router basename="/admin">
      <Switch>
        <Route exact path="/login" component={Login} />
        <div className="h-screen">
          <Topbar />
          <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
              {/* Content Start */}
              <Route exact path="/tables" component={Tables} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/menus/labels" component={Labels} />
              <Route exact path="/menus/allergens" component={Allergens} />
              <Route exact path="/menus/:menusId/categories/:categoriesId/dish/:dishId" component={Dishes} />
              <Route exact path="/menus/:menusId/categories/:categoriesId/dish" component={Dishes} />
              <Route exact path="/menus/:id/editor" component={() => <p>editor</p>} />
              <Route exact path="/menus/add" component={MenuEditor} />
              <Route exact path="/menus/:id" component={MenuEditor} />
              <Route exact path="/menus" component={Menus} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              {/* Content End */}
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  )
}
