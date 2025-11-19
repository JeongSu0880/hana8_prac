function addPoints(a, b) {
    const alen = pointLength(a);
    const blen = pointLength(b);
    // const ret = alen > blen ? (a + b).toFixed(alen) : (a + b).toFixed(blen);
    // const ret = (a + b).toFixed(alen > blen ? alen : blen)
    const ret = (a + b).toFixed(Math.max(alen, blen))
    console.log(a, b, '->', +ret)
}

function pointLength(num) {
    if (!num) return 0;
    return num.toString().length - Math.trunc(num).toString().length - 1;
}