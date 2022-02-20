import { derived } from "overmind"
import { CurrentUser } from "./type"

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