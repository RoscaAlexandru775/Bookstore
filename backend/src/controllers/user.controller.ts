import { Request, Response, NextFunction } from "express";
import UserModel  from "../models/user.model";

const userModel = new UserModel();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userModel.register(req.body);
    res.status(201).send("User registered");
  } catch (err: any) {
    res.status(500).send(err);
  }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    
        try {
            const response =  await userModel.login(req.body);
            res.status(200).send({jwt: response});
        } catch (error: any) {
            res.status(500).send(error);
        }
}
    
