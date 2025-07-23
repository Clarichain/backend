import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

export const verifyAccessJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){ res.status(400).json({ message:"No access token" }); return }
    try{
        const user = jwt.verify(token, jwtConfig.accessTokenSecret!);
        (req as any).user = user
        next()
    }catch(err){
        res.status(500).json({ error:err }) 
    }
}