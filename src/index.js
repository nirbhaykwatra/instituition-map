import express from 'express';
import dotenv from 'dotenv/config';
import path from 'path';
import router from './modules/router.js';
import base_router from "./modules/base-router.js";
import { protect } from "./modules/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(import.meta.dirname, 'public', 'css')));
app.use(express.static(path.join(import.meta.dirname, 'public', 'js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'index.html'));
})

app.use('/', base_router);
app.use('/api', protect, router);

app.listen(port, () => {})
console.log(`Server running at http://localhost:${port}`);