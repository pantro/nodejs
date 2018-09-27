const express = require('express');
const router = express.Router();
const GMapsModel = require('../models/gmaps');

router.post('/by_type', (req, res, next) => {
    const body = req.body.data;
    GMapsModel.byType(body, (error, data) => {
        if(error)
            return res.status(500).json({"error-api": error});

        return res.json(data);
    });
});

module.exports = router;