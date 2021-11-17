import getStatus from "./status.js";

const startEmitter = (influx, io) => {
    const getApiAndEmit = async (socket) => {
        try {
            const data = await getStatus(influx);
            socket.emit("FromAPI", data);
        } catch (error) {
            console.error(`Error: ${error.code}`);
        }
    };

    let interval;

    io.on("connection", socket => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 10000);
        socket.on("disconnect", () => {
        });
    });
}

export default startEmitter;