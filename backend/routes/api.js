import express from 'express';
import getStatus from '../api/status.js';
import loadPrices from '../api/prices.js';

const router = express.Router();

export default (influx) => {
    router.get("", (req, res) => {
        res.send({ response: "TON Status Panel" }).status(200);
    });

    router.get("/info", async (req, res) => {
        res.send(await getStatus(influx, true)).status(200);
    });

    router.get("/prices", async (req, res) => {
        res.send(await loadPrices(influx, true)).status(200);
    });

    return router;
}

