import axios from "axios"
import { Context } from ".."
import { LabelDto } from "./effects"

export const getAllLabels = async ({ state, actions, effects }: Context) => {
    try {
        const response = await effects.labels.getLabels()
        const labels = response.data
        state.labels.labels = labels
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Labels",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

    }
}

export const createLabel = async ({ state, actions, effects }: Context, label: LabelDto): Promise<true> => {
    try {
        const response = await effects.labels.createLabel(label)
        const newLabel = response.data
        state.labels.labels = [...state.labels.labels, newLabel]
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Labels",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

export const updateLabel = async ({ state, actions, effects }: Context, { id, label }: { id: string, label: LabelDto }): Promise<true> => {
    try {
        const response = await effects.labels.updateLabel(id, label)
        const updatedLabel = response.data
        const index = state.labels.labels.findIndex(label => label._id === id)
        state.labels.labels[index] = updatedLabel
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren des Labels",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

export const deleteLabel = async ({ state, actions, effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.labels.deleteLabel(id)
        state.labels.labels = state.labels.labels.filter(label => label._id !== id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Löschen des Labels",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        return false
    }
}