import { request } from "../../services/axios";

export type UserDto = {
    email: string
    username: string
    password?: string
}

export type UserDtoWithId = UserDto & { _id: string }

export type User = {
    _id: string
    email: string
    username: string
}

export const getAllUser = () => request.get<User[]>('/users')