import { execPath } from "process";
import { fetchUser, sum, sumId } from "./sum";

describe('sum', () => {
    beforeAll(() => {
        console.log('beforeAll')
    })
    test('sum - 3 with 1, 2', () => {
        const tot = sum(1, 2);
        expect(tot).toBe(3)
    })

    test('sum - 0 with no-params', () => {
        expect(sum()).toBe(0)
    })
})

describe('sumUserId', () => {
    test('users count', async () => {
        const sumUserId = await sumId();
        expect(sumUserId).toBe(55)
    })
})

describe('user-fetch-test', () => {
    test('users sum of ids', async () => {
        const sumUserId = await sumId();
        expect(sumUserId).toBe(55)
    })

    test('fetchUser with 1', async () => {
        const bret = { id: 1, username: 'Bret' }

        expect(await fetchUser(bret.id))
        await expect(fetchUser(bret.id)).resolves.toStrictEqual(bret) // 객체니까 toStrictEaual
    })

    test('fetchUser with not-exists userId - await', async () => {

        await expect(fetchUser(100)).rejects.toThrow(`USerID not found`);
    })

})