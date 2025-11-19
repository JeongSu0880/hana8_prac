{
    let xx;
    function f2(t) {
        console.log(t, 'nested', xx);
    }
    xx = 99;
    f2('first');
}
f2('second');