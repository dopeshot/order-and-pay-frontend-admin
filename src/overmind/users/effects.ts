import { request } from "../../services/axios";

export type User = {
    _id: string,
    email: string,
    username: string
}

export const getAllUser = () => request.get<User[]>('/users')