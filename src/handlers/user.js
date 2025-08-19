import { sql_auth } from "../modules/database_utility.js";
import {comparePassword, createJWT, hashPassword} from "../modules/auth.js";

export const createNewUser = async (req, res) => {
    // Implement username validation (no duplicate usernames)
    
    const usernames = await sql_auth `SELECT username FROM map_auth.public.users;`;
    if (req.body.username in usernames) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const password = await hashPassword(req.body.password);
    
    const user = await sql_auth `INSERT INTO map_auth.public.users (username, password) VALUES (${req.body.username}, ${password}) RETURNING *;`;
    
    const token = createJWT(user);
    res.status(201).json({ token });
}

export const loginUser = async (req, res, next) => {
    const user = await sql_auth `SELECT * FROM map_auth.public.users WHERE username = ${req.body.username};`;
    
    const password = await sql_auth `SELECT password FROM map_auth.public.users WHERE username = ${req.body.username};`;
    const valid = await comparePassword(req.body.password, password[0].password);
    
    if (valid) {
        const token = createJWT(user);
        res.cookie('token', token, {
            httpOnly: true,
            //secure: true,
            maxAge: 3600000,
            sameSite: 'strict'
        })
        .status(200)
        .json({ token });
        next();
    } else {
        res.status(401);
        return res.redirect('/login');
    }
}