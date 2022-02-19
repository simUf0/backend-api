import { QueryCondition, QueryConditionStatement, QueryLimitStatement, QueryOrderByStatement, QueryRange, QuerySelectStatement, QuerySet, QueryStatement } from "../types";
import queryFormatter from "./query-formatter";

export class QueryBuilder {

  private _statement?: QueryStatement;
  private _table: string = '';
  private _distinct: boolean = false;
  private _select: string[] = [];
  private _insert: string[] = [];
  private _set: string[] = [];
  private _values: string[] = [];
  private _conditions: [QueryCondition, QueryConditionStatement][] = [];
  private _orderBy: string[] = [];
  private _limit: string = '';  

  build(): string {
    let queryString = '';
    if (!this._table.empty()) {
      switch (this._statement) {
        case 'select':
          queryString += queryFormatter.formatSelect(this._table, this._select, this._distinct);
          this._select = [];
          this._distinct = false;
          break;
        case 'insert':
          queryString += queryFormatter.formatInsert(this._table, this._insert, this._values);
          this._insert = [];
          this._values = [];
          break;
        case 'update':
          queryString += queryFormatter.formatUpdate(this._table, this._set);
          this._set = [];
          break;
        case 'delete':
          queryString += queryFormatter.formatDelete(this._table);
          break;
      }
      this._table = '';
    }
    if (!this._conditions.empty()) {
      for (const condition of this._conditions) {
        queryString += queryFormatter.formatCondition(condition);
      }
      this._conditions = [];
    }
    if (!this._orderBy.empty()) {
      queryString += queryFormatter.formatOrderBy(this._orderBy);
      this._orderBy = [];
    }
    if (!this._limit.empty()) {
      queryString += queryFormatter.formatLimit(this._limit);
      this._limit = '';
    }
    return `${queryString};`;
  }


  // Query statements

  distinct(): this {
    this._distinct = true;
    return this;
  }

  select(options: QuerySelectStatement): this {
    this._statement = 'select';
    if (typeof options == 'string') {
      this._select.push(options);

    } else if (Array.isArray(options)) {
      for (const option of options) {
        this.select(option);
      }

    } else {
      for (const key in options) {
        this._select.push(`${key} AS ${options[key]}`);
      }
    }
    return this;
  }

  insert(options: QuerySet): this {
    this._statement = 'insert';
    for (const key in options) {
      const value = queryFormatter.formatValue(options[key]);
      this._insert.push(key);
      this._values.push(value);
    }
    return this;
  }

  set(options: QuerySet): this {
    this._statement = 'update';
    for (const key in options) {
      const value = queryFormatter.formatValue(options[key]);
      this._set.push(`${key} = ${value}`);
    }
    return this;
  }

  delete(): this {
    this._statement = 'delete';
    return this;
  }


  // Table statements

  from(table: string): this {
    this._table = table;
    return this;
  }

  into(table: string): this {
    this._table = table;
    return this;
  }

  update(table: string): this {
    this._table = table;
    return this;
  }


  // Sorting statements

  orderBy(options: QueryOrderByStatement): this {
    if (typeof options == 'string') {
      this._orderBy.push(options);

    } else if (Array.isArray(options)) {
      this._orderBy = options;

    } else {
      for (const key in options) {
        const order = options[key].toUpperCase();
        this._orderBy.push(`${key} ${order}`);
      }
    }
    return this;
  }

  limit(options: QueryLimitStatement): this {
    if (typeof options == 'number') {
      this._limit = options.toString();
    } else {
      this._limit = `${options[0]}, ${options[1]}`;
    }
    return this;
  }


  // Conditions statements

  where(condition: QueryConditionStatement): this {
    this._conditions = [];
    this._conditions.push(['where', condition]);
    return this;
  }

  whereNot(condition: QueryConditionStatement): this {
    this._conditions = [];
    this._conditions.push(['whereNot', condition]);
    return this;
  }

  and(condition: QueryConditionStatement): this {
    this._conditions.push(['and', condition]);
    return this;
  }

  andNot(condition: QueryConditionStatement): this {
    this._conditions.push(['andNot', condition]);
    return this;
  }

  or(condition: QueryConditionStatement): this {
    this._conditions.push(['or', condition]);
    return this;
  }

  orNot(condition: QueryConditionStatement): this {
    this._conditions.push(['orNot', condition]);
    return this;
  }
}

export const queryBuilder = new QueryBuilder();
export default queryBuilder;