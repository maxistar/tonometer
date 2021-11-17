# Tonometer.xyz TON status page

[Frontend Contest: TON status page, Stage 1](https://github.com/newton-blockchain/TIPs/issues/43)

Task:
Create a web app and corresponding open-source backend, which display summarized data on the state and availability of TON Blockchain.

In particular, the page should display:

- Performance and block rate of TON chains: masterchain and basechain (note that there may be more than one shard on basechain)
- Performance and responsiveness of primary TON services: ton.org, ton.sh, toncenter.com
- TON/ETH and TON/BSC bridge operability status
- Status of main on-chain governance activity: validator elections, config votings, slashing.
- Public liteservers performance: response time and sync state
- Public DHT-servers performance
- Basic on-chain stats: tps, accounts activity, transferred amount by type, number of validators

API and integration with notification services (Telegram channel/bot) will increase your chances to win.


# Deployment

# Development
```shell
cd ./backend
yarn install
yarn start
```

# Build Production Release


this project was made just for fun to get familiar with the platform. It should not be used for making the trading desisions. Author is not responsible for any finansicall loss.
some data sown on the pages can be outdated, some even could be still mocked.

-React Material Design set of components for the UI
- React
- InfluxDB Timeseries database ideal for data storing.
- stream.io
- Tonmon set of scrips to parse and store lite client response.

Further development
- create a chat boat and robot for notifications
- allow websockets for socket.io
- load price trough anothe api, ton.sh seems returns always the same
- add more servers to harvest the data, right now big part of it works on my local compiter.
- setup proper deployment strategy using apache-modproxy and forever is questionable solution, nginx on top of cybernetes cluster would be more stable.

Deployment
forever

Architercture
frontend - react js app
backend - nodejs app
importer - scripts to import global data
tomnon - scripts to import lite client output
modified version of tonmon made to work with influxdb instead if the original one.

Data Harvesting
CQRS approach allows to scale app very esily. The different parts of the app can be geographically distributed which makes the final result even more precise. The components of the system are communicating gogether writing and reading data to influxdb database.
The UI panel is simple React Js App on top of node.js api, which used Influxdb for data aggregation. There is also a possibility to show data in grafana.
Since the data collection and visialisation are separated it makes the app really fast.

[image]