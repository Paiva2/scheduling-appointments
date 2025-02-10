import { NextFunction, Request, Response } from "express";

export default function globalExceptionHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    //@ts-ignore
    const status = err.cause?.status ? err.cause.status : 500;

    return res.status(status).send({
      status,
      message: err.message ?? "Internal server error.",
      timestamp: new Date(),
      exception: err.constructor.name,
    });
  }

  next();
}
