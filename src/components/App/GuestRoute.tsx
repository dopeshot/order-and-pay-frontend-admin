import { Redirect, Route, RouteProps, useLocation } from "react-router-dom"
import { useAppState } from "../../overmind"

export type LocationState = {
    from: {
        pathname: string
    }
}

export const GuestRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    // Get global state
    const { isLoggedIn } = useAppState().auth

    const location = useLocation<LocationState>()
    // Get page where are you from and redirect after login
    const { from } = location.state || { from: { pathname: "/admin" } };

    return <Route {...rest} render={() =>
        (!isLoggedIn) ?
            children :
            <Redirect to={from} />
    } />
}