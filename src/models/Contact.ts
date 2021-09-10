export type Contact = {
    Gender?: Gender,
    Name?: string,
    Age?: number,
    Avatar?: string,
    Hobby?: Partial<string>,
    Address?: Partial<string>,
    Roles?: string[]
}

enum Gender {
    F = 1,
    M = 2,
    X = 3
}