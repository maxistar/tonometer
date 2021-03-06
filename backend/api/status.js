let cache = null;
const getStatus = async (influx, cached) => {
    if (cached && cache) {
        return cache;
    }
    try {
        const items = await influx.query(
            'SELECT _creatorstats_mc_cnt2048, \n' +
            '     _creatorstats_mc_cnt65536, \n' +
            '     _creatorstats_mc_total, \n' +
            '     _creatorstats_shard_cnt2048, \n' +
            '     _creatorstats_shard_cnt65536, \n' +
            '     _creatorstats_shard_total, \n' +
            '     _cur_validators, \n' +
            '     _elections_contract_balance, \n' +
            '     _elections_participants, \n' +
            '     _elections_stakes, \n' +
            '     _elections_state, \n' +
            '     _mc_last_block, \n' +
            '     _transactions ' +
            'FROM "toncoin" ' +
            'GROUP BY * ' +
            'ORDER BY DESC ' +
            'LIMIT 1'
        );

        const ton_sh = await influx.query(
            'SELECT latency, price ' +
            'FROM "ton_th" ' +
            'GROUP BY * ' +
            'ORDER BY DESC ' +
            'LIMIT 1'
        );
        cache = {info: items[0], general: ton_sh[0]};
        return cache;
    } catch (e) {
        return [];
    }
}

export default getStatus;