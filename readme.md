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