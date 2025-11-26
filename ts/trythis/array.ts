const enum ID {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL'
}

const SIZE: { id: ID, price: number }[] = [
    { id: ID.XS, price: 8000 },
    { id: ID.S, price: 10000 },
    { id: ID.M, price: 12000 },
    { id: ID.L, price: 14000 },
    { id: ID.XL, price: 15000 },
]

const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };

const sizeOption1 = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
const totalPrice1 = SIZE.reduce((currPrice, size) => currPrice + sizeOption1[size.id] * size.price, 0);

// const sizeOption2 = { XS: 2, S: 3, MM: 4, L: 5, XL: 6 };
const sizeOption2 = { XS: 2, S: 3, MM: 4, L: 5, XL: 6 };
const totalPrice2 = SIZE.reduce((currPrice, size) => currPrice + sizeOption2[size.id] * size.price, 0);
//두번째일때 에러가 나게 하라!!
