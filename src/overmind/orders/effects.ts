import { request } from "../../services/axios";
import { Order, OrderDto } from "./type";


// Get all open Orders
export const getAllOrders = () => request.get<Order[]>('/orders/current')

// Update Order
export const updateOrder = (id: string, order: OrderDto) => request.patch<Order>(`/orders/${id}`, order)