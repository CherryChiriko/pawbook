export interface IUser {
    id: number,
    name: string,
    species: string,
    email: string,
    country: string,
    city: string,
    isLoggedIn: boolean,
    password : string,
    friends ?: number[],
    profilePic?: string
}

export interface ILogin {
    name: string,
    password : string
}

export interface IPost {
    userId: number,
    content : string
}