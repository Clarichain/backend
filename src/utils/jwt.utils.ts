///redacted
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import "dotenv/config"

interface payloadInterace{
  id: string,
  email: string | undefined,
}


export const generateAccessToken = (payload: any) =>
  // jwt.sign(payload, jwtConfig.accessTokenSecret, { expiresIn: (jwtConfig.accessTokenExpiresIn as string) });
  jwt.sign(payload, jwtConfig.accessTokenSecret, { expiresIn: "15min" });

export const generateRefreshToken = (payload: any) =>
  jwt.sign(payload, jwtConfig.refreshTokenSecret, { expiresIn: "7d"} );

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, jwtConfig.accessTokenSecret);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, jwtConfig.refreshTokenSecret);
