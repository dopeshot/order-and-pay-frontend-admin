import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import { Allergens } from "../../pages/admin/Allergens"
import { CategoriesEditor } from "../../pages/admin/CategoriesEditor"
import { Dashboard } from "../../pages/admin/Dashboard"
import { Dishes } from "../../pages/admin/Dishes"
import { Labels } from "../../pages/admin/Labels"
import { Menu } from "../../pages/admin/Menu"
import { Menus } from "../../pages/admin/Menus"
import { MenusEditor } from "../../pages/admin/MenusEditor"
import { Orders } from "../../pages/admin/Orders"
import { Tables } from "../../pages/admin/Tables"
import { Users } from "../../pages/admin/Users"
import { Sidebar } from "../Navigation/Sidebar"
import { Topbar } from "../Navigation/Topbar"

/**
 * Contains admin routes and styling 
 */
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
                    <Route exact path={`${path}/home`} component={Dashboard} />
                    <Route exact path={`${path}/users`} component={Users} />
                    <Route exact path={`${path}/menus`} component={Menus} />
                    <Route exact path={`${path}/orders`} component={Orders} />
                    <Route exact path={`${path}/menus/allergens`} component={Allergens} />
                    <Route exact path={`${path}/menus/labels`} component={Labels} />
                    <Route exact path={`${path}/menus/add`} component={MenusEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories`} component={CategoriesEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId`} component={CategoriesEditor} />
                    <Route exact path={`${path}/menus/:menuId/edit`} component={MenusEditor} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId/dish/:dishId`} component={Dishes} />
                    <Route exact path={`${path}/menus/:menuId/categories/:categoryId/dish`} component={Dishes} />
                    <Route exact path={`${path}/menus/:menuId/editor`} component={Menu} />
                    <Route path={`${path}`}>
                        <Redirect to={`${path}/home`} />
                    </Route>
                </Switch>
                {/* Content End */}
            </div>
        </div>
    </div>
}