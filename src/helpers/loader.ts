import fs from "fs";
import { dirname, resolve } from "path";
import { Application, Service } from "..";
import { DbHandler } from "../components";
import defaultConfig from '../config.json';
import Component from '../lib/component';
import { Config } from "../types";

class Loader {

  private _appRoot: string;

  constructor() {
    this._appRoot = dirname(require.main?.filename as string);
  }

  // TODO: A compléter à chaque création d'une nouvelle configuration
  iniConfig(userConfig?: Config): Config {
    const config: Config = defaultConfig;
    if (userConfig?.database) {
      if (userConfig.database.options) {
        config.database.options = {
          ...config.database.options,
          ...userConfig.database.options
        };
      }
      config.paths = {...config.paths, ...userConfig.paths};
    }
    if (userConfig?.paths) {
      config.paths = {...config.paths, ...userConfig.paths};
    }
    if (userConfig?.server) {
      config.server = {...config.server, ...userConfig.server};
    }
    return config;
  }

  iniComponents(app: Application): Component[] {
    const components: Component[] = [];
    const modules = require('../components/index');
    for (let key in modules) {
      components.push(new modules[key](app))
    }
    return components;
  }

  iniServices(app: Application, dbh: DbHandler): Service[] {
    const services: Service[] = [];
    const path = resolve(`${this._appRoot}/${app.config.paths.services}`);
    const filenames = [...new Set(
      fs.readdirSync(path).map(v=> v.split('.', 2).join('.'))
    )];
    filenames.forEach(filename => {
      const module = require(`${path}/${filename}`);
      services.push(new module.default(app, dbh));
    });
    return services;
  }
}

export const loader = new Loader();
export default loader;