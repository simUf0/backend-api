import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application as Express } from 'express';
import { Components, Service } from '..';
import { console, errorHandler, loader } from '../helpers';
import { ComponentConstructor, Config, ControllerConstructor, ServiceConstructor } from '../types';
import Component from './component';

export class Application {

  private _config: Config;
  private _express: Express = express();
  private _components: Component[] = [];
  private _services: Service[] = [];

  constructor(config?: Config) {
    this._config = loader.iniConfig(config);
    this._components = loader.iniComponents(this);
    this._services = loader.iniServices(this, this.component(Components.DbHandler));
    this._express.use(cors());
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: true }));
  }

  get config(): Config {
    return this._config;
  }

  component<T>(constructor: ComponentConstructor<T>): T {
    for (let component of this._components) {
      if (component instanceof constructor) {
        return component;
      }
    }
    throw new ReferenceError(`Component '${constructor.name}' doesn't exist`);
  }

  service<T>(constructor: ServiceConstructor<T>): T {
    for (let service of this._services) {
      if (service instanceof constructor) {
        return service;
      }
    }
    throw new ReferenceError(`Service '${constructor.name}' doesn't exist`);
  }

  route(path: string, constructor: ControllerConstructor): this {
    const controller = new constructor(this);
    this._express.use(path, controller.handle());
    return this;
  }

  static(path: any, root: string): this {
    this._express.use(path, express.static(root));
    return this;
  }

  listen(
    port: number = this._config.server.port,
    hostname: string = this._config.server.hostname
  ): void {
    this._express.use(errorHandler);
    this._express.listen(port, hostname, () => {
      const url = this._config.server.scheme + hostname + port;
      console.log(`Server listening at ${url}`.yellow);
    });
  }
}

export default Application;