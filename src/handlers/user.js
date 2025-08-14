import { sql_auth } from "../modules/database_utility.js";
import {comparePassword, createJWT, hashPassword} from "../modules/auth.js";

export const createNewUser = async (req, res) => {
    // Implement username validation (no duplicate usernames)
    console.log(req.body);
    const password = await hashPassword(req.body.password);
    
    const user = await sql_auth `INSERT INTO map_auth.public.users (username, password) VALUES (${req.body.username}, ${password}) RETURNING *;`;
    
    const token = createJWT(user);
    res.status(201).json({ token });
}

export const loginUser = async (req, res) => {
    const user = await sql_auth `SELECT * FROM map_auth.public.users WHERE username = ${req.body.username};`;
    
    const password = await sql_auth `SELECT password FROM map_auth.public.users WHERE username = ${req.body.username};`;
    console.log(password);
    const valid = await comparePassword(req.body.password, password[0].password);
    
    if (valid) {
        const token = createJWT(user);
        console.log(token);
        return res.status(200).json({ token });
    } else {
        res.status(401);
        return res.json({ message: 'Invalid username or password' });
    }
}