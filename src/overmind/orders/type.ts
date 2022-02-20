import { ChoiceType } from "../categories/type"
import { Table } from "../tables/state"

export type OrderDto = {
    status: OrderStatus,
    paymentStatus?: PaymentStatus
}

export type Order = {
    _id: string
    table: Table
    items: Item[]
    paymentStatus: PaymentStatus
    status: OrderStatus
    price: number
    createdAt: Date
    updatedAt: Date
}

export type Item = {
    dishId: string
    dishName: string
    count: number
    pickedChoices: PickedChoices[]
    note: string
}

export type PickedChoices = {
    id: number
    title: string
    type: ChoiceType
    valueId: number[]
    optionNames: string[]
}

export enum PaymentStatus {
    PENDING = 'pending',
    RECEIVED = 'received',
    CANCELED = 'canceled'
}

export enum OrderStatus {
    RECEIVED = 'received',
    IN_PROGRESS = 'in_progress',
    FINISHED = 'finished',
    RETURNED = 'returned',
    CANCELLED = 'cancelled'
}
