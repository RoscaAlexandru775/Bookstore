import { Request, Response, NextFunction } from "express";
import CartModel  from "../models/cart.model";

const cartModel = new CartModel();

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await cartModel.addToCart(req.body);
    res.status(201).send("Book added to cart");
  } catch (err: any) {
    if (err === "Book is already in cart") {
        res.status(409).send(err);
    }
    else{
    res.status(500).send(err);
    }
  }
};
    
export const removeFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await cartModel.removeFromCart(req.body.cart_id);
      res.status(200).send("Book removed from cart");
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

      
export const getUserCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      const response =  await cartModel.getUserCart(req.body.user_id);
      res.status(200).send(response);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
      