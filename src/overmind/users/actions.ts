import { Context } from ".."
import { UserDto } from "./effects"

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

export const createUser = async ({ state, effects }: Context): Promise<boolean> => {
    return true
}

export const updateUser = async ({ state, effects }: Context, { _id, user }: { _id: string, user: UserDto }): Promise<boolean> => {
    console.log(_id, user)
    return true
}