import { derived } from "overmind"

export type CurrentUser = {
    _id: string,
    username: string,
    email: string
}

export type State = {
    authenticating: boolean
    isLoggedIn: boolean
    currentUser: CurrentUser | null
}

export const state: State = {
    authenticating: false,
    isLoggedIn: derived((state: State) => Boolean(state.currentUser)),
    currentUser: null
}