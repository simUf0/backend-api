import { RequestHandler, Router } from "express";
import { Application } from "..";
import Component from "./component";
export declare abstract class Controller extends Component {
    private _routes;
    constructor(app: Application);
    handle(): Router;
    protected get(path: string, handler: RequestHandler): void;
    protected post(path: string, handler: RequestHandler): void;
    protected put(path: string, handler: RequestHandler): void;
    protected delete(path: string, handler: RequestHandler): void;
    private addRoute;
}
export default Controller;
