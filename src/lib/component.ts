import Application from "./application";

export abstract class Component {

  private _app: Application;

  constructor(app: Application) {
    this._app = app;
  }

  protected get app(): Application {
    return this._app;
  }

}

export default Component;