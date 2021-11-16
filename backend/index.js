import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import index from './routes/index.js';
import Influx from 'influx';
import dotenv from 'dotenv';
import * as path from "path";

dotenv.config();
const port = process.env.PORT || 3002;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use('/alive', index);
const options = {
    index: "index.html"
};
app.use(express.static(process.env.STATIC_FILES, options));

app.get('/*', function(req, res) {
    res.sendFile(path.join(process.env.STATIC_FILES, 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

const influx = new Influx.InfluxDB(process.env.INFLUXDB_URL);

const getApiAndEmit = async socket => {
    try {
        const res = Math.random()
        const data = await influx.query(
            'SELECT * FROM "toncoin" GROUP BY * ORDER BY DESC LIMIT 1'
        );
        /**
         _creatorstats_mc_cnt2048: 576.06,
         _creatorstats_mc_cnt65536: 18275.4,
         _creatorstats_mc_total: 16108983,
         _creatorstats_shard_cnt2048: 643.161,
         _creatorstats_shard_cnt65536: 20268.9,
         _creatorstats_shard_total: 172283887,
         _cur_validators: 148,
         _elections_contract_balance: 198200497,
         _elections_participants: null,
         _elections_stakes: 0,
         _elections_state: 0,
         _mc_last_block: 16108983,
         _transactions: 19005
         */
        console.log(data);
        socket.emit("FromAPI", data[0]);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

let interval;

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 10000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(
    port,
    () => console.log(`Listening on port: ${port}.`)
)