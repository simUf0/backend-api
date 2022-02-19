"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const config_json_1 = __importDefault(require("../config.json"));
class Loader {
    constructor() {
        var _a;
        this._appRoot = (0, path_1.dirname)((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
    }
    iniConfig(userConfig) {
        const config = config_json_1.default;
        if (userConfig === null || userConfig === void 0 ? void 0 : userConfig.database) {
            if (userConfig.database.options) {
                config.database.options = Object.assign(Object.assign({}, config.database.options), userConfig.database.options);
            }
            config.paths = Object.assign(Object.assign({}, config.paths), userConfig.paths);
        }
        if (userConfig === null || userConfig === void 0 ? void 0 : userConfig.paths) {
            config.paths = Object.assign(Object.assign({}, config.paths), userConfig.paths);
        }
        if (userConfig === null || userConfig === void 0 ? void 0 : userConfig.server) {
            config.server = Object.assign(Object.assign({}, config.server), userConfig.server);
        }
        return config;
    }
    iniComponents(app) {
        const components = [];
        const modules = require('../components/index');
        for (let key in modules) {
            components.push(new modules[key](app));
        }
        return components;
    }
    iniServices(app, dbh) {
        const services = [];
        const path = (0, path_1.resolve)(`${this._appRoot}/${app.config.paths.services}`);
        const filenames = [...new Set(fs_1.default.readdirSync(path).map(v => v.split('.', 2).join('.')))];
        filenames.forEach(filename => {
            const module = require(`${path}/${filename}`);
            services.push(new module.default(app, dbh));
        });
        return services;
    }
}
exports.loader = new Loader();
exports.default = exports.loader;
//# sourceMappingURL=loader.js.map