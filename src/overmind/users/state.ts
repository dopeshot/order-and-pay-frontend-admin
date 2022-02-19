import { User } from "./effects"

export type State = {
    users: User[]
}

export const state: State = {
    users: []
}