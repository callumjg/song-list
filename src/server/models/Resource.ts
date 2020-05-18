import NamedError from './NamedError';

class Resource {
  static schema;

  static find;

  protected async put() {
    return this;
  }

  protected async insert() {
    return this;
  }

  constructor(values) {
    const validated = this.validate(values);
    Object.keys(values).forEach((key) => {
      this[key] = validated[key];
    });
  }

  validate(values?) {
    const { schema } = this.constructor as typeof Resource;
    const validated = schema.validateSync(values || this);
    return validated;
  }

  async save() {
    const { name } = this.constructor;
    const idName = `${name.substr(0, 1).toLowerCase()}${name.substr(1)}Id`;
    return this[idName] ? this.put() : this.insert();
  }

  static validateId(_id) {
    const id = parseInt(_id, 10);
    if (!id.toString().match(/^\d+$/))
      throw new NamedError('Client', 'Invalid id provided');
    return id;
  }
}

export default Resource;
