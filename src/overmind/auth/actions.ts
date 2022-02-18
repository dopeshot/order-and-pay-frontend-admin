import { Context } from "..";
import { Credentials } from "./effects";

export const initializeUser = async ({ state, effects }: Context) => {
    const token = localStorage.getItem('access_token')
    state.auth.authenticating = true

    if (token) {
        effects.auth.setToken(token)
        const userResponse = await effects.auth.getCurrentUser()
        state.auth.currentUser = userResponse.data
    }

    state.auth.authenticating = false
}

export const login = async ({ state, effects }: Context, credentials: Credentials) => {
    state.auth.authenticating = true
    try {
        const responseToken = await effects.auth.login(credentials)
        const { access_token } = responseToken.data

        effects.auth.setToken(access_token)
        const userResponse = await effects.auth.getCurrentUser()
        state.auth.currentUser = userResponse.data
    } catch (error) {
        console.error(error)
    }
    state.auth.authenticating = false
}

export const logout = ({ state, effects }: Context) => {
    state.auth.currentUser = null;
    effects.auth.setToken()
}