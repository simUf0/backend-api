"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
const __1 = require("..");
const component_1 = __importDefault(require("./component"));
class Controller extends component_1.default {
    constructor(app) {
        super(app);
        this._routes = [];
        const dbh = app.component(__1.Components.DbHandler);
    }
    handle() {
        const router = (0, express_1.Router)();
        for (const route of this._routes) {
            switch (route.method) {
                default:
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
    get(path, handler) {
        this.addRoute(path, handler, 'get');
    }
    post(path, handler) {
        this.addRoute(path, handler, 'post');
    }
    put(path, handler) {
        this.addRoute(path, handler, 'put');
    }
    delete(path, handler) {
        this.addRoute(path, handler, 'delete');
    }
    addRoute(path, handler, method) {
        this._routes.push({
            path: path,
            method: method,
            handler: handler,
        });
    }
}
exports.Controller = Controller;
exports.default = Controller;
//# sourceMappingURL=controller.js.map