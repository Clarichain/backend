import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const registerserController = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error Registering user', error: err });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const tokens = authService.loginUser(req.body);
    res.status(200).json(tokens);
  } catch(err){
    res.status(500).json({  message: "Error logging in user", error: err})
  }
}