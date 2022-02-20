import axios from "axios";
import { Context } from "..";
import { Credentials } from "./effects";

/**
 *  Login user when app is startet and we already were logged in
 */
export const initializeUser = async ({ state, effects, actions }: Context) => {
    const token = localStorage.getItem('access_token')
    state.auth.authenticating = true

    try {
        // istanbul ignore if // cant test because we cant test if we get reloggedin
        if (token) {
            effects.auth.setToken(token)
            const userResponse = await effects.auth.getCurrentUser()
            state.auth.currentUser = userResponse.data
        }
    } catch (error) /* istanbul ignore next */ {
        if (axios.isAxiosError(error) && error.response) {
            // Logout when the access token is not valid anymore
            actions.auth.logout()
        }
    }
    state.auth.couldBeLoggedIn = false
    state.auth.authenticating = false
}


/**
 * Login action
 */
export const login = async ({ state, effects, actions }: Context, credentials: Credentials) => {
    state.auth.authenticating = true
    try {
        const responseToken = await effects.auth.login(credentials)
        const { access_token } = responseToken.data

        effects.auth.setToken(access_token)
        const userResponse = await effects.auth.getCurrentUser()
        state.auth.currentUser = userResponse.data
    } catch (error) {
        console.error(error)
        actions.notify.createNotification({
            title: "Fehler beim Anmelden",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
    state.auth.authenticating = false
}

/**
 * Logout action
 */
export const logout = ({ state, effects }: Context) => {
    state.auth.currentUser = null;
    effects.auth.setToken()
}

/** Only for testing */
export const loginTest = ({ state, effects }: Context) => {
    state.auth.currentUser = {
        "_id": "620fbc5b991a915224910122",
        "username": "test",
        "email": "test@gmail.de"
    }
    effects.auth.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiI2MjBmYmM1Yjk5MWE5MTUyMjQ5MTAxMjIiLCJpYXQiOjE2NDUyMDc4NTEsImV4cCI6MTY0NTI0Mzg1MX0.vBeV4UkpnU2xCZtmPP5ti1txGXvcUt8_TpeL9AJnYVI")
}