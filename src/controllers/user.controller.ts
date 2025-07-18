import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};
