import { RequestHandler, Router } from "express";
import { Application, Service, Components } from "..";
import { loader } from "../helpers";
import { HttpMethod, Route, ServiceConstructor } from "../types";
import Component from "./component";

export abstract class Controller extends Component {

  private _routes: Route[] = [];
  // private _services: Service[] = [];

  constructor(app: Application) {
    super(app);
    const dbh = app.component(Components.DbHandler);
    // this._services = loader.iniServices(app, dbh);
  }

  handle(): Router {
    const router = Router();
    for (const route of this._routes) {
      switch (route.method) {
        default :
        case 'get':
          router.get(route.path, route.handler);
          break;
        case 'post':
          router.post(route.path, route.handler);
          break;
        case 'put':
          router.put(route.path, route.handler);
          break;
        case 'delete':
          router.delete(route.path, route.handler);
          break;
      }
    }
    return router;
  }

  // protected service<T>(constructor: ServiceConstructor<T>): T {
  //   for (let service of this._services) {
  //     if (service instanceof constructor) {
  //       return service;
  //     }
  //   }
  //   throw new ReferenceError(`Service '${constructor.name}' doesn't exist`);
  // }

  protected get(path: string, handler: RequestHandler): void {
    this.addRoute(path, handler, 'get');
  }

  protected post(path: string, handler: RequestHandler): void {
    this.addRoute(path, handler, 'post');
  }

  protected put(path: string, handler: RequestHandler): void {
    this.addRoute(path, handler, 'put');
  }

  protected delete(path: string, handler: RequestHandler): void {
    this.addRoute(path, handler, 'delete');
  }

  private addRoute(path: string, handler: RequestHandler, method: HttpMethod): void {
    this._routes.push({
      path: path,
      method: method,
      handler: handler,
    });
  }

}

export default Controller;