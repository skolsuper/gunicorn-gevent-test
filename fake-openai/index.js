const express = require('express');
const app = express();
const port = 3000;

const RESPONSE_CHUNKS = 10;
const CHUNK_DELAY = 1_000;
const CHUNK_CONTENT = Buffer.from('A'.repeat(100));

app.get('/', (req, res) => {
    res.status(200);
    new Array(RESPONSE_CHUNKS).fill(0).forEach((value, index) => {
        setTimeout(() => {
            console.log('Sending chunk');
            res.write(CHUNK_CONTENT);
        }, index * CHUNK_DELAY);
    });
    setTimeout(() => {
        console.log('Done');
        res.end();
    }, CHUNK_DELAY * RESPONSE_CHUNKS);
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed')
    });
});
