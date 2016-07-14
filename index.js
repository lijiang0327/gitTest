'use strict'
const fs = require('fs');
const express = require('express');
const path = require('path');

let app = express();

app.use('/', express.static('www'));

app.listen(3000, '127.0.0.1', () => {
	console.log('server is running at 127.0.0.1:3000');
	
})