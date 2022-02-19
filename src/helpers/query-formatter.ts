import { QueryCondition, QueryConditionStatement, QueryRange } from "../types";

export class QueryFormatter {

  formatValue(value: string|number|boolean): string {
    return typeof value == 'string' ? `"${value}"` : value.toString();
  }

  formatSelect(table: string, select: string[], distinct: boolean = false): string {
    let queryString = 'SELECT ';
    if (distinct) queryString += 'DISTINCT ';
    queryString += select.join(', ');
    return `${queryString} FROM ${table}`;
  }

  formatInsert(table: string, insert: string[], values: string[]): string {
    let queryString = `INSERT INTO ${table} `;
    queryString += '(' + insert.join(', ') + ') ';
    queryString += 'VALUES (' + values.join(', ') + ')';
    return queryString;
  }

  formatUpdate(table: string, set: string[]): string {
    let queryString = `UPDATE ${table} `;
    queryString += 'SET ' + set.join(', ');
    return queryString;
  }

  formatDelete(table: string): string {
    return `DELETE FROM ${table}`;
  }

  formatCondition(condition: [QueryCondition, QueryConditionStatement]): string {
    let queryString = '';
    switch (condition[0]) {
      default:case 'where': queryString += ' WHERE '; break;
      case 'whereNot': queryString += ' WHERE NOT '; break;
      case 'and': queryString += ' AND '; break;
      case 'andNot': queryString += ' AND NOT '; break;
      case 'or': queryString += ' OR '; break;
      case 'orNot': queryString += ' OR NOT '; break;
    }
    queryString += condition[1][0];
    switch (condition[1][1]) {
      case 'between':
        const range = condition[1][2] as QueryRange;
        queryString += ` BETWEEN ${range.join(' AND ')}`;
        break;
      case 'like':
        queryString += ` LIKE "${condition[1][2]}"`;
        break;
      case 'in':
        const enums = (condition[1][2] as (string|number)[]).map(v => {
          if (typeof v == 'string') return `"${v}"`;
          else return v;
        });
        queryString += ` IN (${enums.join(', ')})`;
        break;
    
      default:
        queryString += ` ${condition[1][1]} `;
        if (typeof condition[1][2] == 'string') {
          queryString += `"${condition[1][2]}"`;
        } else {
          queryString += condition[1][2];
        }
        break;
    }
    return queryString;
  }

  formatLimit(limit: string): string {
    return ` LIMIT ${limit}`;
  }

  formatOrderBy(orderBy: string[]): string {
    return ' ORDER BY ' + orderBy.join(', ');
  }
}

export const queryFormatter = new QueryFormatter();
export default queryFormatter;