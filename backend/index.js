import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import index from './routes/index.js';
import Influx from 'influx';
import dotenv from 'dotenv';

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
const influx = new Influx.InfluxDB(process.env.INFLUXDB_URL);

const getApiAndEmit = async socket => {
    try {
        const res = Math.random()
        const data = await influx.query('SELECT "_mc_last_block" FROM "toncoin" GROUP BY * ORDER BY DESC LIMIT 1');
        socket.emit("FromAPI", data[0]._mc_last_block);
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