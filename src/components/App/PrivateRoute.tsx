import { Redirect, Route, RouteProps } from "react-router-dom"
import { useAppState } from "../../overmind"


export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const { isLoggedIn, couldBeLoggedIn } = useAppState().auth

    return <Route
        {...rest}
        render={({ location }) =>
            (isLoggedIn || couldBeLoggedIn) ? children : <Redirect to={{
                pathname: "/login",
                state: { from: location }
            }} />
        }
    />
}