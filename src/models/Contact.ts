export type Contact = {
    Gender?: Gender,
    name?: string,
    motto?: string,
    Age?: number,
    avatarUrl?: string,
    Hobby?: Partial<string>,
    Address?: Partial<string>,
    Roles?: string[]
}

enum Gender {
    F = 1,
    M = 2,
    X = 3
}