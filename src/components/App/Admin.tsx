import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import { Allergens } from "../../pages/Allergens/Allergens"
import { CategoryEditor } from "../../pages/Categories/CategoryEditor"
import { Dishes } from "../../pages/Dishes/Dishes"
import { Home } from "../../pages/Home/Home"
import { Labels } from "../../pages/Labels/Labels"
import { SingleMenu } from "../../pages/MenuOverview/SingleMenu"
import { MenuEditor } from "../../pages/Menus/MenuEditor"
import { Menus } from "../../pages/Menus/Menus"
import { Tables } from "../../pages/Tables/Tables"
import { Sidebar } from "../Navigation/Sidebar"
import { Topbar } from "../Navigation/Topbar"

export const Admin: React.FC = () => {

    const { path } = useRouteMatch()

    return <div className="h-screen">
        <Topbar />
        <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                {/* Content Start */}
                <Switch>
                    <Route exact path={`${path}/tables`} component={Tables} />
                    <Route exact path={`${path}/home`} component={Home} />
                    <Route exact path={`${path}/menus`} component={Menus} />
                    <Route exact path={`${path}/menus/allergens`} component={Allergens} />
                    <Route exact path={`${path}/menus/labels`} component={Labels} />
                    <Route exact path={`${path}/menus/add`} component={MenuEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories`} component={CategoryEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId`} component={CategoryEditor} />
                    <Route exact path={`${path}/menus/:menuId/edit`} component={MenuEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId/dish/:dishId`} component={Dishes} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId/dish`} component={Dishes} />
                    <Route exact path={`${path}/menus/:menuId/editor`} component={SingleMenu} />
                    <Route path={`${path}`}>
                        <Redirect to={`${path}/home`} />
                    </Route>
                </Switch>
                {/* Content End */}
            </div>
        </div>
    </div>
}