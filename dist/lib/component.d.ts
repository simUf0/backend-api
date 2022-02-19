import Application from "./application";
export declare abstract class Component {
    private _app;
    constructor(app: Application);
    protected get app(): Application;
}
export default Component;
