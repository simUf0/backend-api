import { Application, Service } from "..";
import { DbHandler } from "../components";
import Component from '../lib/component';
import { Config } from "../types";
declare class Loader {
    private _appRoot;
    constructor();
    iniConfig(userConfig?: Config): Config;
    iniComponents(app: Application): Component[];
    iniServices(app: Application, dbh: DbHandler): Service[];
}
export declare const loader: Loader;
export default loader;
