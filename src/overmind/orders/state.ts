import { Order } from "./effects"

export type State = {
    orders: Order[]
}

export const state: State = {
    orders: []
}