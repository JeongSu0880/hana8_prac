class Emp {
    //다른 언어들은 firstname, lastname 선언해야하는데 안해도 됨.왜 안해도 돼 왜 왜 왜
    constructor(name) {
        this.setFullname(name)
    }

    setFullname(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }

    // getFullname() {
    //     return `${this.firstName} ${lastName}`
    // }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

const hong = new Emp('Kildong Hong')
console.log(hong.fullName)
hong.fullName = 'Nanda Lim'

const kim = { id: 1, firstName: 'Nanda', lastName: 'Kim' }
const proxyObj = new Proxy(kim, {
    get(target, prop, receiver) { //proxy 자기 자신을 주는 거야 receiver는! (항상 변경될 수 있기 때문에)
        console.log('receiver>>', receiver === proxyObj)
        if (prop === 'fullName') {
            return `${target.firstName} ${target.lastName}`
        }
        return target[prop];
    },

    set(target) {
        if (prop === 'fullName') {
            [target.firstName, target.lastName] = value.split(' ')
        } else {
            target[prop] = value
        }
    }
});
//왜 get 안에서 this는 hong이 돼?
console.log('name :: ', proxyObj.fullName, kim.fullName)
//proxyObj로 접근해야함.
console.log(proxyObj instanceof Emp)

//Proxy는 생성자함수 (클래스 아님)

// Object.defineProperty(Emp.prototype, 'upperName')
Object.defineProperties(Emp.prototype, {
    upperName: {
        get() {
            return this.fullName.toUpperCase();
        }
    },
    lowerName: {
        get: function () {
            return this.fullName.toLowerCase();
        }
    }
})
Emp.prototype.nameLength = function () {
    return this.fullName.length
}
console.log('upper >> ', hong.upperName)
console.log('lower >> ', hong.lowerName)
console.log('nameLen >> ', hong.nameLength())

console.log('---------------------------------------')

class Pet {
    feed(nutrient) {
        console.log(`feed`)
    }
}

Object.assign(Emp.prototype, { feed: Pet.prototype.feed }) //이것이 mixin

console.log(hong.feed('banana'))

