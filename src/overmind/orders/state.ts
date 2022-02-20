import { Order } from "./type"

export type State = {
    orders: Order[]
}

export const state: State = {
    orders: []
}