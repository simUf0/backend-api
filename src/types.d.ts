import { RequestHandler } from "express";
import { Application, Controller, Components } from ".";

/**
 * Constructor types.
 */
export type ComponentConstructor<T> = {
  new (app: Application): T;
}
export type ControllerConstructor = {
  new (app: Application): Controller;
}
export type ServiceConstructor<T> = {
  new (app: Application, dbh: Components.DbHandler): T;
}

/**
 * Configuration types.
 */
export type Config = {
  // browser: BrowserConfig;
  database: DatabaseConfig;
  // debug: boolean;
  // logs: LogsConfig;
  // parser: {};
  paths: PathsConfig;
  server: ServerConfig;
};
export type DatabaseConfig = {
  options: DatabaseOptionsConfig;
};
export type DatabaseOptionsConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
}
export type PathsConfig = {
  services: string;
  workers: string;
};
export type ServerConfig = {
  scheme: string;
  hostname: string;
  port: number;
};

/**
 * Route type.
 */
export type Route = {
  path: string;
  method: HttpMethod;
  handler: RequestHandler;
};

/**
 * Http methods type.
 */
export type HttpMethod = 'get'|'post'|'put'|'delete';

/**
 * Query string type.
 */
export type QueryOrder = 'asc'|'desc';
export type QueryStatement = 'select'|'insert'|'update'|'delete';
export type QueryOperator = '='|'>'|'<'|'>='|'<='|'<>'|'between'|'like'|'in';
export type QueryCondition = 'where'|'whereNot'|'and'|'andNot'|'or'|'orNot';
export type QueryRange = [number, number];
export type QuerySet = {[property: string]: string|number|boolean};
export type QuerySelectStatement = string|{[property: string]: string}|(string|{[property: string]: string})[];
export type QueryConditionStatement = [string, QueryOperator, string|number|boolean|QueryRange|(string|number)[]];
export type QueryOrderByStatement = string|string[]|{[property: string]: QueryOrder};
export type QueryLimitStatement = number|QueryRange;