"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const component_1 = __importDefault(require("./component"));
class Service extends component_1.default {
    constructor(app, dbh) {
        super(app);
        this._dbh = dbh;
    }
    get dbh() {
        return this._dbh;
    }
}
exports.Service = Service;
exports.default = Service;
//# sourceMappingURL=service.js.map