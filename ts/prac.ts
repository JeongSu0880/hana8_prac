type A = {
    status: string,
    value: number
}

type B = {
    status: string,
    reason: string
}

type C = keyof A & keyof B
type D = Partial<Omit<A & B, keyof A & keyof B>> & {
    [k in keyof A & keyof B]: (A & B)[k]
}