import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const createJWT = (user) => {
    return jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    
    const [, token] = bearer.split(' ');
    
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({message: 'Invalid token!'});
    }
}