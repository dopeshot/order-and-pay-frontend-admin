import { Context } from ".."

export const getAllUser = async ({ state, effects }: Context) => {
    try {
        const response = await effects.users.getAllUser()
        const users = response.data
        state.users.users = users
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}
