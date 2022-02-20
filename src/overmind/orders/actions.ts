import axios from "axios"
import { Context } from ".."
import { OrderDto } from "./effects"

/**
 * Get all Orders request
 */
export const getAllOrders = async ({ state, effects, actions }: Context) => {
    try {
        const response = await effects.orders.getAllOrders()
        const orders = response.data
        state.orders.orders = orders
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Bestellungen",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
}

/**
 * Update order status and payment action
 */
export const updateOrder = async ({ state, effects, actions }: Context, { id, order }: { id: string, order: OrderDto }): Promise<true> => {
    try {
        const response = await effects.orders.updateOrder(id, order)
        const updatedOrder = response.data
        const index = state.orders.orders.findIndex(allergen => allergen._id === id)
        state.orders.orders[index] = updatedOrder
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren der Bestellung",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}