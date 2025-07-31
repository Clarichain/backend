import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { createSupabaseClientWithToken } from "../config/supabase";
import { User } from "@supabase/supabase-js";

declare global{
    namespace Express{
        interface Request{
            user?: User | null;
            supabase?: ReturnType<typeof createSupabaseClientWithToken>
        }
    }
}

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

export const verifySupabaseAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log("request authHeader: ", authHeader);
    //test
    // console.log("request authHeader: ", req.headers.authorization)
    const supabaseAccessToken = authHeader && authHeader.split(' ')[1]

    if(!supabaseAccessToken){ res.status(400).json({ message:"No access token" }); return }
    try{
        const supabase = createSupabaseClientWithToken(supabaseAccessToken)
        const { data: { user }, error } = await supabase.auth.getUser()

        if(!user || error){
            res.status(401).json({"error":"Unauthorzed access or expired token"})
        }
        
        req.user = user;
        req.supabase = supabase
        next()
    }catch(err){
        res.status(500).json({ error:err })
        return
    }
}