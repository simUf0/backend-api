import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
export declare function errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response;
export default errorHandler;
