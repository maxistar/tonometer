import express from 'express';
import getStatus from '../api/status.js';

const router = express.Router();

export default (influx) => {
    router.get("", (req, res) => {
        res.send({ response: "TON Status Panel" }).status(200);
    });

    router.get("/info", async (req, res) => {
        res.send(await getStatus(influx)).status(200);
    });

    return router;
}

