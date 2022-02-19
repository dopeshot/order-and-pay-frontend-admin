import { derived } from "overmind"

export type CurrentUser = {
    _id: string,
    username: string,
    email: string
}

export type State = {
    authenticating: boolean
    couldBeLoggedIn: boolean
    isLoggedIn: boolean
    currentUser: CurrentUser | null
}

export const state: State = {
    authenticating: false,
    couldBeLoggedIn: true,
    isLoggedIn: derived((state: State) => Boolean(state.currentUser)),
    currentUser: null
}