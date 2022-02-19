import { ComponentConstructor, Config, ControllerConstructor, ServiceConstructor } from '../types';
export declare class Application {
    private _config;
    private _express;
    private _components;
    private _services;
    constructor(config?: Config);
    get config(): Config;
    component<T>(constructor: ComponentConstructor<T>): T;
    service<T>(constructor: ServiceConstructor<T>): T;
    route(path: string, constructor: ControllerConstructor): this;
    static(path: any, root: string): this;
    listen(port?: number, hostname?: string): void;
}
export default Application;
