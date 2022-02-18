import { request } from "../../services/axios";
import { CurrentUser } from "./state";

export type Credentials = {
    email: string,
    password: string
}

export const login = (credentials: Credentials) => request.post<{ access_token: string }>('/auth/login', credentials)

export const getCurrentUser = () => request.get<CurrentUser>('/users/profile')

export const setToken = (token?: string) => {
    if (!token) {
        localStorage.removeItem('access_token');
        delete request.defaults.headers.common['Authorization']
    }
    if (token) {
        localStorage.setItem('access_token', token);
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}
