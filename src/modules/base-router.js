import { Router } from 'express';
import path from "path";
import {createNewUser, loginUser} from "../handlers/user.js";
import {protectAdminCookie, protectCookie, storeUrl} from "./auth.js";

const base_router = Router();

base_router.get('/', protectCookie, (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/index.html'));
})

base_router.get('/admin', protectAdminCookie, (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/admin.html'));
})

base_router.get('/config', (req, res) => {
    res.json({
        mapsApiKey: process.env.MAPS_API
    });
})
base_router.get('/institutions', (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/manageinstitutions.html'));
})

base_router.get('/manage-users', (req, res) => {
    res.sendFile(path.join(path.dirname(import.meta.dirname), '/manageusers.html'));
})

base_router.post('/user', createNewUser);
base_router.post('/signin', loginUser)

export default base_router;