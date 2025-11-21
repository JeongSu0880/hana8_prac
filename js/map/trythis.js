const assert = require('assert');

const hrTeam = { id: 1, dname: '인사팀' };
const devTeam = { id: 2, dname: '개발팀' };
const depts = [hrTeam, devTeam];
const hong = { id: 1, name: 'Hong', dept: 1 };  // hong.dept.dname ⇒ deptMap.get(hong.dept)?.dname
const kim = { id: 2, name: 'Kim', dept: 2 };
const emps = [hong, kim, { id: 3, name: 'Park', dept: 2 }, { id: 4, name: 'Choi', dept: 2 }];

const x = depts.map(dept => [dept.id, dept])
console.log("🚀 ~ x:", x)
const deptMap = new Map(x);
console.log("🚀 ~ deptMap:", deptMap)

assert.deepStrictEqual([...deptMap.values()], depts)

const empMap = new Map(emps.map(emp => [emp.id, emp]))

assert.deepStrictEqual([...empMap.keys()], emps.map(emp => emp.id))
assert.deepStrictEqual([...empMap.values()], emps)

const empDept = new Map(emps.map(emp => {
    const value = deptMap.get(emp.dept)
    delete emp.dept
    return [emp, value]
}))
console.log("🚀 ~ empDept:", empDept)

assert.deepStrictEqual(
    [...empDept.keys()],
    emps.map(({ id, name }) => ({ id, name }))
)

assert.deepStrictEqual(
    [...empDept.keys()],
    emps.map(({ id, name }) => ({ id, name }))
);



assert.strictEqual(empDept.get(kim)?.dname, devTeam.dname);

function getEmp(empId) {
    // {id:1, name: 'Hong', dept: {id:1, dname: 'Sale'}}

    const emp = empMap.get(empId)
    emp.dept = empDept.get(emp)
    return emp
}

assert.deepStrictEqual(getEmp(1), { id: 1, name: 'Hong', dept: { id: 1, dname: '인사팀' } });



// console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)
// console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }
// console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }

// console.log(empDept.get(kim).dname);

