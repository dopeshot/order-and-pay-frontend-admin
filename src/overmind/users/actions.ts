import { Context } from ".."
import { UserDto } from "./effects"

/**
 * Get all Users
 */
export const getAllUser = async ({ state, effects }: Context) => {
    try {
        const response = await effects.users.getAllUser()
        const users = response.data
        state.users.users = users
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * Create new User
 */
export const createUser = async ({ state, effects }: Context): Promise<boolean> => {
    try {
        const response = await effects.users.createUser()
        const newUser = response.data
        state.users.users = [...state.users.users, newUser]
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * Update User by id
 */
export const updateUser = async ({ state, effects }: Context, { _id, user }: { _id: string, user: UserDto }): Promise<boolean> => {
    try {
        const response = await effects.users.updateUser(_id, user)
        const updatedUser = response.data
        const index = state.users.users.findIndex(users => users._id === _id)
        state.users.users[index] = updatedUser
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * Delete User by id
 */
export const deleteUser = async ({ state, effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.users.deleteUser(id)
        state.users.users = state.users.users.filter(users => users._id !== id)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}