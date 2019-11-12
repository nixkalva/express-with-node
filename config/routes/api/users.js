const express = require('express');
const router = express.Router();

router.get('/', (res, req) => res.send("Users api is running "));

module.exports = router;