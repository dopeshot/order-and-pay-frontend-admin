import { request } from "../../services/axios";
import { ChoiceType } from "../categories/effects";

export type Order = {
    _id: string
    tableId: string
    items: Item[]
    PaymentStatus: PaymentStatus
    Status: OrderStatus
    price: number
    createdAt: string
    updatedAt: string
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

export type Item = {
    dishId: string
    count: number
    pickedChoices: PickedChoices
    note: string
}

export type PickedChoices = {
    id: number
    type: ChoiceType
    valueId: number[]
}

export type OrderDto = {
    Status: OrderStatus,
    PaymentStatus?: PaymentStatus
}

export const getAllOrders = () => request.get<Order[]>('/orders')

export const updateOrder = (id: string, order: OrderDto) => request.patch<OrderDto>(`/orders/${id}`, order)