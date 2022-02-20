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