import { Context } from ".."

export const getAllLabels = async ({ state, effects }: Context) => {
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