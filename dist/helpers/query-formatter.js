"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFormatter = exports.QueryFormatter = void 0;
class QueryFormatter {
    formatValue(value) {
        return typeof value == 'string' ? `"${value}"` : value.toString();
    }
    formatSelect(table, select, distinct = false) {
        let queryString = 'SELECT ';
        if (distinct)
            queryString += 'DISTINCT ';
        queryString += select.join(', ');
        return `${queryString} FROM ${table}`;
    }
    formatInsert(table, insert, values) {
        let queryString = `INSERT INTO ${table} `;
        queryString += '(' + insert.join(', ') + ') ';
        queryString += 'VALUES (' + values.join(', ') + ')';
        return queryString;
    }
    formatUpdate(table, set) {
        let queryString = `UPDATE ${table} `;
        queryString += 'SET ' + set.join(', ');
        return queryString;
    }
    formatDelete(table) {
        return `DELETE FROM ${table}`;
    }
    formatCondition(condition) {
        let queryString = '';
        switch (condition[0]) {
            default:
            case 'where':
                queryString += ' WHERE ';
                break;
            case 'whereNot':
                queryString += ' WHERE NOT ';
                break;
            case 'and':
                queryString += ' AND ';
                break;
            case 'andNot':
                queryString += ' AND NOT ';
                break;
            case 'or':
                queryString += ' OR ';
                break;
            case 'orNot':
                queryString += ' OR NOT ';
                break;
        }
        queryString += condition[1][0];
        switch (condition[1][1]) {
            case 'between':
                const range = condition[1][2];
                queryString += ` BETWEEN ${range.join(' AND ')}`;
                break;
            case 'like':
                queryString += ` LIKE "${condition[1][2]}"`;
                break;
            case 'in':
                const enums = condition[1][2].map(v => {
                    if (typeof v == 'string')
                        return `"${v}"`;
                    else
                        return v;
                });
                queryString += ` IN (${enums.join(', ')})`;
                break;
            default:
                queryString += ` ${condition[1][1]} `;
                if (typeof condition[1][2] == 'string') {
                    queryString += `"${condition[1][2]}"`;
                }
                else {
                    queryString += condition[1][2];
                }
                break;
        }
        return queryString;
    }
    formatLimit(limit) {
        return ` LIMIT ${limit}`;
    }
    formatOrderBy(orderBy) {
        return ' ORDER BY ' + orderBy.join(', ');
    }
}
exports.QueryFormatter = QueryFormatter;
exports.queryFormatter = new QueryFormatter();
exports.default = exports.queryFormatter;
//# sourceMappingURL=query-formatter.js.map