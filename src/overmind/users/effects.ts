import { request } from "../../services/axios";

export type UserDto = {
    email: string
    username: string
    password?: string
}

export type User = {
    _id: string
    email: string
    username: string
    password?: string
}
export type AccessToken = {
    accessToken: string
}

// Get all users
export const getAllUser = () => request.get<User[]>('/users')
// Create new user
export const createUser = (user: UserDto) => request.post<AccessToken>('/auth/register', user)
// Update user by id
export const updateUser = (id: string, user: UserDto) => request.patch<User>(`/users/${id}`, user)
// Delete user by id
export const deleteUser = (id: string) => request.delete<void>(`/users/${id}`)