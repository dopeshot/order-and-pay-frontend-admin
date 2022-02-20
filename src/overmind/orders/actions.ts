import { Context } from ".."
import { OrderDto } from "./effects"

/**
 * Get all Orders request
 */
export const getAllOrders = async ({ state, effects }: Context) => {
    state.orders.isLoadingOrders = true
    try {
        const response = await effects.orders.getAllOrders()
        const orders = response.data
        state.orders.orders = orders
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
    }
    state.orders.isLoadingOrders = false
}

/**
 * Update order status and payment action
 */
export const updateOrder = async ({ state, effects }: Context, { id, order }: { id: string, order: OrderDto }): Promise<boolean> => {
    try {
        const response = await effects.orders.updateOrder(id, order)
        const updatedOrder = response.data
        const index = state.orders.orders.findIndex(allergen => allergen._id === id)
        state.orders.orders[index] = updatedOrder
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}