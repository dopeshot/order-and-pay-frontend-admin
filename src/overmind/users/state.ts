import { User } from "./effects"

export type State = {
    isLoadingUsers: boolean
    users: User[]
}

export const state: State = {
    isLoadingUsers: false,
    users: []
}