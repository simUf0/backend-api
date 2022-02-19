"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = exports.QueryBuilder = void 0;
const query_formatter_1 = __importDefault(require("./query-formatter"));
class QueryBuilder {
    constructor() {
        this._table = '';
        this._distinct = false;
        this._select = [];
        this._insert = [];
        this._set = [];
        this._values = [];
        this._conditions = [];
        this._orderBy = [];
        this._limit = '';
    }
    build() {
        let queryString = '';
        if (!this._table.empty()) {
            switch (this._statement) {
                case 'select':
                    queryString += query_formatter_1.default.formatSelect(this._table, this._select, this._distinct);
                    this._select = [];
                    this._distinct = false;
                    break;
                case 'insert':
                    queryString += query_formatter_1.default.formatInsert(this._table, this._insert, this._values);
                    this._insert = [];
                    this._values = [];
                    break;
                case 'update':
                    queryString += query_formatter_1.default.formatUpdate(this._table, this._set);
                    this._set = [];
                    break;
                case 'delete':
                    queryString += query_formatter_1.default.formatDelete(this._table);
                    break;
            }
            this._table = '';
        }
        if (!this._conditions.empty()) {
            for (const condition of this._conditions) {
                queryString += query_formatter_1.default.formatCondition(condition);
            }
            this._conditions = [];
        }
        if (!this._orderBy.empty()) {
            queryString += query_formatter_1.default.formatOrderBy(this._orderBy);
            this._orderBy = [];
        }
        if (!this._limit.empty()) {
            queryString += query_formatter_1.default.formatLimit(this._limit);
            this._limit = '';
        }
        return `${queryString};`;
    }
    distinct() {
        this._distinct = true;
        return this;
    }
    select(options) {
        this._statement = 'select';
        if (typeof options == 'string') {
            this._select.push(options);
        }
        else if (Array.isArray(options)) {
            for (const option of options) {
                this.select(option);
            }
        }
        else {
            for (const key in options) {
                this._select.push(`${key} AS ${options[key]}`);
            }
        }
        return this;
    }
    insert(options) {
        this._statement = 'insert';
        for (const key in options) {
            const value = query_formatter_1.default.formatValue(options[key]);
            this._insert.push(key);
            this._values.push(value);
        }
        return this;
    }
    set(options) {
        this._statement = 'update';
        for (const key in options) {
            const value = query_formatter_1.default.formatValue(options[key]);
            this._set.push(`${key} = ${value}`);
        }
        return this;
    }
    delete() {
        this._statement = 'delete';
        return this;
    }
    from(table) {
        this._table = table;
        return this;
    }
    into(table) {
        this._table = table;
        return this;
    }
    update(table) {
        this._table = table;
        return this;
    }
    orderBy(options) {
        if (typeof options == 'string') {
            this._orderBy.push(options);
        }
        else if (Array.isArray(options)) {
            this._orderBy = options;
        }
        else {
            for (const key in options) {
                const order = options[key].toUpperCase();
                this._orderBy.push(`${key} ${order}`);
            }
        }
        return this;
    }
    limit(options) {
        if (typeof options == 'number') {
            this._limit = options.toString();
        }
        else {
            this._limit = `${options[0]}, ${options[1]}`;
        }
        return this;
    }
    where(condition) {
        this._conditions = [];
        this._conditions.push(['where', condition]);
        return this;
    }
    whereNot(condition) {
        this._conditions = [];
        this._conditions.push(['whereNot', condition]);
        return this;
    }
    and(condition) {
        this._conditions.push(['and', condition]);
        return this;
    }
    andNot(condition) {
        this._conditions.push(['andNot', condition]);
        return this;
    }
    or(condition) {
        this._conditions.push(['or', condition]);
        return this;
    }
    orNot(condition) {
        this._conditions.push(['orNot', condition]);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
exports.queryBuilder = new QueryBuilder();
exports.default = exports.queryBuilder;
//# sourceMappingURL=query-builder.js.map