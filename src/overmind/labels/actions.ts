import { Context } from ".."
import { LabelDto } from "./effects"

export const getAllLabels = async ({ state, effects }: Context) => {
    // Backoff when already loading
    if (state.labels.isLoadingLabels)
        return

    state.labels.isLoadingLabels = true
    try {
        const response = await effects.labels.getLabels()
        const labels = response.data
        state.labels.labels = labels
    } catch (error) {
        console.error(error)
    }
    state.labels.isLoadingLabels = false
}

export const createLabel = async ({ state, effects }: Context, label: LabelDto) => {
    // Backoff when already loading
    if (state.labels.isLoadingCreateLabel)
        return

    state.labels.isLoadingCreateLabel = true
    try {
        const response = await effects.labels.createLabel(label)
        const newLabel = response.data
        state.labels.labels.push(newLabel)
    } catch (error) {
        console.error(error)
    }
    state.labels.isLoadingCreateLabel = false
}