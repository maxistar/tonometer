import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Influx from 'influx';

dotenv.config();
const influx = new Influx.InfluxDB(process.env.INFLUXDB_URL);

async function loadNames() {
    try {
        const msStart = (new Date()).getTime();
        const response = await fetch('https://api.ton.sh/getCoinPrice');
        const names = await response.json();
        const msEnd = (new Date()).getTime();

        await influx.writePoints([
            {
                measurement: 'ton_th',
                fields: {
                    price: names.result + Math.random(), //always returns the same, add some latency!
                    latency: msEnd - msStart
                },
            }
        ]);
    } catch (e) {
        console.log(e)
    }
}
loadNames();
