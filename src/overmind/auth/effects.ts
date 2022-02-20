import { request } from "../../services/axios";
import { CurrentUser } from "./state";

export type Credentials = {
    email: string,
    password: string
}

/** Login user */
export const login = (credentials: Credentials) => request.post<{ access_token: string }>('/auth/login', credentials)

/** Get current user profile */
export const getCurrentUser = () => request.get<CurrentUser>('/users/profile')

/** Set token to local storage ans set authorization header for requests */
export const setToken = (token?: string) => {
    if (!token) {
        localStorage.removeItem('access_token');
        delete request.defaults.headers.common['Authorization']
    } else {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('access_token', token);
    }
}
