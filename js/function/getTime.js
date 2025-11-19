function getDiffMillis(dt1, dt2) {
    const d1 = new Date(dt1);
    const d2 = new Date(dt2);

    const { getTime: getTime1 } = d1;
    const { getTime: getTime2 } = d2;
    return getTime1.apply(d1) - getTime2.apply(d2);

}
getDiffMillis('2021-01-01', '2021-01-02');