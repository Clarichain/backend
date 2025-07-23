import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiresIn,
  });

export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiresIn,
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, jwtConfig.accessTokenSecret);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, jwtConfig.refreshTokenSecret);
