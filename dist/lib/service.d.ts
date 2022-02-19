import { Application, Components } from "..";
import Component from "./component";
export declare abstract class Service extends Component {
    private _dbh;
    constructor(app: Application, dbh: Components.DbHandler);
    protected get dbh(): Components.DbHandler;
}
export default Service;
