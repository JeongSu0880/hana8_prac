import { fetchUser, sum } from "./sum"
import { BRET } from "./sum.test"
import { isDeepStrictEqual } from "util"

describe('mock', () => {
    beforeAll(() => {

    })

    const sumX = vi.mocked(sum)
    sumX.mockImplementation((...args: number[]) => {
        // if (args[0] === 1 && args[1] === 2) return 3;
        // if (args[0] === 10 && args[1] === 2) return 12

        if (isDeepStrictEqual(args, [1, 2])) return 3;
        if (isDeepStrictEqual(args, [10, 2])) return 12;
        return 0
    })
})

//beforeEach ->각 테스트 마다
//beforAll =. 맨 처음 한번
