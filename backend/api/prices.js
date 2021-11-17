let cache = null;
const loadPrices = async (influx, cached) => {
    if (cached && cache) {
        return cache;
    }
    try {
        cache = await influx.query(
            ' SELECT MEAN(price) ' +
            ' FROM "ton_th" ' +
            ' WHERE time > now() - 1d ' +
            ' GROUP BY time(30m) ' +
            ' ORDER BY ASC '
        );
        return cache;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export default loadPrices;