export abstract class Entity {

  private _id?: number;

  constructor(id?: number) {
    this._id = id;
  }
  
  get id(): number|undefined {
    return this._id;
  }
}

export default Entity;