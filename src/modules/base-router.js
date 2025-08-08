import { Router } from 'express';
import {schools, industryPartners, postSecondary, retrieveSchools} from "./database_utility.js";
import path from "path";
import router from "./router.js";

const base_router = Router();

base_router.get('/login', (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/login.html'));
})

base_router.post('/login', (req, res) => {
    res.redirect('/admin');
})

base_router.get('/admin', (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/admin.html'));
})

base_router.get('/config', (req, res) => {
    res.json({
        mapsApiKey: process.env.MAPS_API
    });
})

export default base_router;