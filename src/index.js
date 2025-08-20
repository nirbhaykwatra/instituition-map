import express from 'express';
import dotenv from 'dotenv/config';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as crypto from "node:crypto";
import router from './modules/router.js';
import base_router from "./modules/base-router.js";
import { protect, protectCookie } from "./modules/auth.js";
import { loginUser, loginAdmin } from "./handlers/user.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(import.meta.dirname, 'public', 'css')));
app.use(express.static(path.join(import.meta.dirname, 'public', 'js')));
app.use(express.static(path.join(import.meta.dirname, 'public', 'images')));
app.use(express.static(path.join(import.meta.dirname, 'public', 'fonts')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const cookieSecret = crypto.randomBytes(48).toString('hex');
app.use(cookieParser(cookieSecret));
const sessionSecret = crypto.randomBytes(48).toString('hex');
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));


app.get('/login', (req, res) => {
    if (req.signedCookies.token) {
        res.redirect('/');
        return;
    }
    res.sendFile(path.join(import.meta.dirname, 'login.html'));
})

app.get('/adminLogin', (req, res) => {
    if (req.signedCookies.adminToken) {
        res.redirect('/admin');
        return;
    }
    res.sendFile(path.join(import.meta.dirname, 'adminLogin.html'));
})

app.post('/login', loginUser);
app.post('/adminLogin', loginAdmin);

app.use('/', base_router);
app.use('/api', protectCookie, router);

app.listen(port, () => {})
console.log(`Server running at http://localhost:${port}`);