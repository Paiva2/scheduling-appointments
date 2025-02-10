import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import zodErrorHandler from "../config/zod/zodError";

export const inputHandler = (zodObject: AnyZodObject) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      zodObject.parse(request.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = zodErrorHandler(err);

        return response.status(400).send({
          status: 400,
          errors,
          timestamp: new Date(),
          exception: "InvalidBodyException",
        });
      }
    }
  };
};
