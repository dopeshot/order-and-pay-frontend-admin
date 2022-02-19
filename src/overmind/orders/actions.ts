import { Context } from ".."
import { OrderDto } from "./effects"

// Get all order action
export const getAllOrders = async ({ effects }: Context) => {
    try {
        await effects.orders.getAllOrders()
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

// Update order status and payment action
export const updateOrder = async ({ effects }: Context, { id, order }: { id: string, order: OrderDto }): Promise<boolean> => {
    try {
        await effects.orders.updateOrder(id, order)
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}