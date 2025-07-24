import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(import.meta.dirname, 'public', 'css')));
app.use(express.static(path.join(import.meta.dirname, 'public', 'js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'index.html'));
})

app.get('/api/config', (req, res) => {
    res.json({
        mapsApiKey: process.env.MAPS_API
    });
});


app.listen(port, () => {})
console.log(`Server running at http://localhost:${port}`);