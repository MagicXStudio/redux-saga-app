export type Contact = {
    id?: number,
    gender?: Gender,
    name?: string,
    phone?: string,
    motto?: string,
    age?: number,
    avatarUrl?: string,
    hobby?: Partial<string>,
    address?: Partial<string>,
    roles?: string[]
}

enum Gender {
    F = 1,
    M = 2,
    X = 3
}