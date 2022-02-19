import Application from "..";
import { QueryBuilder } from "../helpers/query-builder";
import Component from "../lib/component";
export declare class DbHandler extends Component {
    private _pool;
    private _queryBuilder;
    constructor(app: Application);
    get queryBuilder(): QueryBuilder;
    query(queryString: string, values?: any): Promise<any>;
}
export default DbHandler;
