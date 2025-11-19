const range = (s, e, step = s > e ? -1 : 1) => {
    if (s === e || step === 0) return [s];
    // if (s > e && step > 0) return [];
    // if (s < e && step < 0) return [];
    if ((s - e) * step > 0) return [];

    // if (e === undefined) {
    //     if (s > 0) {
    //         s = 1;
    //         e = s;
    //     } else if (s < 0) {
    //         e = -1
    //     } else {
    //         return [0];
    //     }
    // }

    const tmps = s;
    e = e ?? (s > 0 ? (s = 1, tmps) : s === 0 ? 0 : -1)

    const rets = [];
    // for (let i = s; i < e; i += step) {
    //    rets.push(i);
    // } //xxxx

    //방법 1
    // while (rets.length < 1000) {//true 하면 만에하나 무한루프일때 좀 큰일...
    //     if (s > e && i < e) break;
    //     if (s < e && i > e) break;

    //     rets.push(i);
    //     i += step
    // }

    for (let i = s; s > e ? i <= e : i <= e; i += step) {
        rets.push(i);
    }

    return rets
}