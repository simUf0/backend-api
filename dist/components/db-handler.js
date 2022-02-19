"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbHandler = void 0;
const mysql_1 = __importDefault(require("mysql"));
const helpers_1 = require("../helpers");
const query_builder_1 = require("../helpers/query-builder");
const component_1 = __importDefault(require("../lib/component"));
class DbHandler extends component_1.default {
    constructor(app) {
        super(app);
        this._pool = mysql_1.default.createPool(app.config.database.options);
        this._queryBuilder = query_builder_1.queryBuilder;
    }
    get queryBuilder() {
        return this._queryBuilder;
    }
    query(queryString, values) {
        helpers_1.console.log(`MySQL request : ${queryString}`.cyan);
        return new Promise((resolve, reject) => {
            this._pool.query(queryString, values, (err, results) => {
                err ? reject(err) : resolve(results);
            });
        });
    }
}
exports.DbHandler = DbHandler;
exports.default = DbHandler;
//# sourceMappingURL=db-handler.js.map