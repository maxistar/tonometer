import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Influx from 'influx';

dotenv.config();
const influx = new Influx.InfluxDB(process.env.INFLUXDB_URL);

async function loadNames() {
    try {
        const response = await fetch('https://api.ton.sh/getCoinPrice');
        const names = await response.json();
        console.log(names);

        influx.writePoints([
            {
                measurement: 'tonth',
                tags: {
                    unit: locationObj.rawtide.tideInfo[0].units,
                    location: locationObj.rawtide.tideInfo[0].tideSite,
                },
                fields: { height: tidePoint.height },
                timestamp: tidePoint.epoch,
            }()
    } catch (e) {
        console.log(e)
    }
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}
loadNames();
