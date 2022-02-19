import mysql, { Pool } from "mysql";
import Application from "..";
import { console } from "../helpers";
import { QueryBuilder, queryBuilder } from "../helpers/query-builder";
import Component from "../lib/component";

export class DbHandler extends Component {

  private _pool: Pool;
  private _queryBuilder: QueryBuilder
  
  constructor(app: Application) {
    super(app);
    this._pool = mysql.createPool(app.config.database.options);
    this._queryBuilder = queryBuilder;
  }

  get queryBuilder(): QueryBuilder {
    return this._queryBuilder;
  }

  query(queryString: string, values?: any): Promise<any> {
    console.log(`MySQL request : ${queryString}`.cyan);
    return new Promise((resolve, reject) => {
      this._pool.query(queryString, values, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });
  }
}

export default DbHandler;