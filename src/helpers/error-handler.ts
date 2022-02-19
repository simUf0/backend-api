import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): Response {

    console.error(err);

    return res.status(400).json({
      error: err.name
    });
    
    // return res.status(400).json({
    //   name: err.name,
    //   code: err.code,
    //   message: err.message,
    // });
}

export default errorHandler;