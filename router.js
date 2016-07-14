'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
	let indexHtml = fs.readFile('www/index.html', (err, data) => {
		res.end(data);
	});
});
exports = router;