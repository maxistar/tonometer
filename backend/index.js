import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import api from './routes/api.js';
import Influx from 'influx';
import dotenv from 'dotenv';
import * as path from "path";
import getStatus from "./api/status.js";

dotenv.config();
const port = process.env.PORT || 3002;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const influx = new Influx.InfluxDB(process.env.INFLUXDB_URL);

app.use('/api', api(influx));
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

const getApiAndEmit = async (socket) => {
    try {
        const data = await getStatus(influx);
        console.log(data);
        socket.emit("FromAPI", data);
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