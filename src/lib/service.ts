import { Application, Components } from "..";
import Component from "./component";

export abstract class Service extends Component {

  private _dbh: Components.DbHandler;

  constructor(app: Application, dbh: Components.DbHandler) {
    super(app);
    this._dbh = dbh;
  }

  protected get dbh(): Components.DbHandler {
    return this._dbh;
  }
}

export default Service;