export type CommandMsg = {
    id: number,
    protocol: string,
    target: string,
    type: number,
    version: number,
    arguments: string[]
};