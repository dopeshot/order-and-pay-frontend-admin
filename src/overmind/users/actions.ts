import axios from "axios"
import { Context } from ".."
import { UserDto } from "./type"

/**
 * Get all Users request with error handling
 */
export const getAllUser = async ({ state, actions, effects }: Context) => {
    try {
        const response = await effects.users.getAllUser()
        const users = response.data
        state.users.users = users
    } catch (error)  /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Benutzer",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeit├╝berschreitung",
            type: "danger"
        })
    }
}

/**
 * Create new User request with error handling
 */
export const createUser = async ({ state, effects, actions }: Context, user: UserDto): Promise<true> => {
    try {
        // Create User
        await effects.users.createUser(user)

        // Update user list
        actions.users.getAllUser()

        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Benutzers",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeit├╝berschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Update User by id request with error handling
 */
export const updateUser = async ({ state, actions, effects }: Context, { _id, user }: { _id: string, user: UserDto }): Promise<true> => {
    try {
        // Strip password when is not changed
        const newUser = { ...user }
        if (newUser.password === "")
            delete newUser.password

        const response = await effects.users.updateUser(_id, newUser)
        const updatedUser = response.data
        const index = state.users.users.findIndex(users => users._id === _id)
        state.users.users[index] = updatedUser
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren des Benutzers",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeit├╝berschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Delete User by id request with error handling
 */
export const deleteUser = async ({ state, actions, effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.users.deleteUser(id)
        state.users.users = state.users.users.filter(users => users._id !== id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim L├Âschen des Benutzers",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeit├╝berschreitung",
            type: "danger"
        })

        return false
    }
}