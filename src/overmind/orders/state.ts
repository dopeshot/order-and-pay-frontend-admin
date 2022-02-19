import { Order } from "./effects"

export type State = {
    isLoadingOrders: boolean
    orders: Order[]
}

export const state: State = {
    isLoadingOrders: true,
    orders: []
}