import React from "react";
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../../overmind';
import { Login } from "../../pages/Login/Login";

export interface RouteHandlerProps extends RouteProps { }

export const RouteHandler: React.FC<RouteHandlerProps> = ({ component, ...props }) => {
    const { isLoggedIn } = useAppState().auth

    if (props.path === "/login") {
        return isLoggedIn ? <Redirect to="/home" /> : <Route exact path="/login" component={Login} />
    }

    return !isLoggedIn ? <Redirect to="/login" /> : <Route {...props} component={component} />
}