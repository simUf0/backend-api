import { QueryCondition, QueryConditionStatement } from "../types";
export declare class QueryFormatter {
    formatValue(value: string | number | boolean): string;
    formatSelect(table: string, select: string[], distinct?: boolean): string;
    formatInsert(table: string, insert: string[], values: string[]): string;
    formatUpdate(table: string, set: string[]): string;
    formatDelete(table: string): string;
    formatCondition(condition: [QueryCondition, QueryConditionStatement]): string;
    formatLimit(limit: string): string;
    formatOrderBy(orderBy: string[]): string;
}
export declare const queryFormatter: QueryFormatter;
export default queryFormatter;
