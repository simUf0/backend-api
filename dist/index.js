"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = exports.Service = exports.Controller = exports.Entity = exports.Application = void 0;
require('./helpers/polyfill');
const application_1 = __importDefault(require("./lib/application"));
var application_2 = require("./lib/application");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return application_2.Application; } });
var entity_1 = require("./lib/entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return entity_1.Entity; } });
var controller_1 = require("./lib/controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_1.Controller; } });
var service_1 = require("./lib/service");
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return service_1.Service; } });
exports.Components = __importStar(require("./components"));
exports.default = application_1.default;
//# sourceMappingURL=index.js.map