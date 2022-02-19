import { QueryConditionStatement, QueryLimitStatement, QueryOrderByStatement, QuerySelectStatement, QuerySet } from "../types";
export declare class QueryBuilder {
    private _statement?;
    private _table;
    private _distinct;
    private _select;
    private _insert;
    private _set;
    private _values;
    private _conditions;
    private _orderBy;
    private _limit;
    build(): string;
    distinct(): this;
    select(options: QuerySelectStatement): this;
    insert(options: QuerySet): this;
    set(options: QuerySet): this;
    delete(): this;
    from(table: string): this;
    into(table: string): this;
    update(table: string): this;
    orderBy(options: QueryOrderByStatement): this;
    limit(options: QueryLimitStatement): this;
    where(condition: QueryConditionStatement): this;
    whereNot(condition: QueryConditionStatement): this;
    and(condition: QueryConditionStatement): this;
    andNot(condition: QueryConditionStatement): this;
    or(condition: QueryConditionStatement): this;
    orNot(condition: QueryConditionStatement): this;
}
export declare const queryBuilder: QueryBuilder;
export default queryBuilder;