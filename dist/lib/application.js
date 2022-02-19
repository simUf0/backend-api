"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const helpers_1 = require("../helpers");
class Application {
    constructor(config) {
        this._express = (0, express_1.default)();
        this._components = [];
        this._services = [];
        this._config = helpers_1.loader.iniConfig(config);
        this._components = helpers_1.loader.iniComponents(this);
        this._services = helpers_1.loader.iniServices(this, this.component(__1.Components.DbHandler));
        this._express.use((0, cors_1.default)());
        this._express.use(body_parser_1.default.json());
        this._express.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    get config() {
        return this._config;
    }
    component(constructor) {
        for (let component of this._components) {
            if (component instanceof constructor) {
                return component;
            }
        }
        throw new ReferenceError(`Component '${constructor.name}' doesn't exist`);
    }
    service(constructor) {
        for (let service of this._services) {
            if (service instanceof constructor) {
                return service;
            }
        }
        throw new ReferenceError(`Service '${constructor.name}' doesn't exist`);
    }
    route(path, constructor) {
        const controller = new constructor(this);
        this._express.use(path, controller.handle());
        return this;
    }
    static(path, root) {
        this._express.use(path, express_1.default.static(root));
        return this;
    }
    listen(port = this._config.server.port, hostname = this._config.server.hostname) {
        this._express.use(helpers_1.errorHandler);
        this._express.listen(port, hostname, () => {
            const url = this._config.server.scheme + hostname + port;
            helpers_1.console.log(`Server listening at ${url}`.yellow);
        });
    }
}
exports.Application = Application;
exports.default = Application;
//# sourceMappingURL=application.js.map