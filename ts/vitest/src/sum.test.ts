import { describe, expect, test } from "vitest"
import { fetchUser, sum, sumId } from "./sum"

export const BRET = { id: 1, username: 'Bret' }
describe('sum', () => {
    test('sum - 7 with 3, 4', () => {
        const tot = sum(3, 4)
        expect(tot).toBe(7)
    })

    test('sum - no params', () => {
        expect(sum()).toBe(0)
    })
})

describe('sumId', () => {
    test('sum Users Id', async () => {
        const sumUserId = await sumId();
        expect(sumUserId).toBe(55)
    })
})

describe('fetch User', () => {
    test('fetch user test', async () => {
        // expect(await fetchUser(bret.id)).resolves.toStrictEqual(bret)//이건 안됨.왜 ? expect는 promise 일때만 resolves를 사용할 수 있는데, 이미 안에서 그걸 벗겨버려서 resolves 사용 불가
        return expect(fetchUser(BRET.id)).resolves.toStrictEqual(BRET)
    })


    test('not exists', async () => {
        await expect(fetchUser(100)).rejects.toThrow(`USerID not found`)
    })
})