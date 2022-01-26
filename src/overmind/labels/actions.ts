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

export const updateLabel = async ({ state, effects }: Context, { id, label }: { id: string, label: LabelDto }) => {
    // Backoff when already loading
    if (state.labels.isLoadingEditLabel)
        return

    state.labels.isLoadingEditLabel = true
    try {
        const response = await effects.labels.updateLabel(id, label)
        const updatedLabel = response.data
        const index = state.labels.labels.findIndex(label => label._id === id)
        state.labels.labels[index] = updatedLabel
    } catch (error) {
        console.error(error)
    }
    state.labels.isLoadingEditLabel = false
}

export const deleteLabel = async ({ state, effects }: Context, id: string) => {
    // Backoff when already loading
    if (state.labels.isLoadingDeleteLabel)
        return

    state.labels.isLoadingDeleteLabel = true
    try {
        await effects.labels.deleteLabel(id)
        state.labels.labels = state.labels.labels.filter(label => label._id !== id)
    } catch (error) {
        console.error(error)
    }
    state.labels.isLoadingDeleteLabel = false
}