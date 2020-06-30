import NamedError from './NamedError';

class Resource {
  static schema;

  static insertSchema?;

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

  validate(values?, context?) {
    const { schema: base, insertSchema } = this.constructor as typeof Resource;
    const schema = context === 'insert' ? insertSchema : base;
    const validated = schema.validateSync(values || this, {
      abortEarly: false,
    });
    return validated;
  }

  async save() {
    const { name } = this.constructor;
    const idName = `${name.substr(0, 1).toLowerCase()}${name.substr(1)}Id`;
    const isNewResource = !this[idName];
    this.validate(this, isNewResource ? 'insert' : 'put');
    return isNewResource ? this.insert() : this.put();
  }

  static validateId(_id) {
    const id = parseInt(_id, 10);
    if (!id.toString().match(/^\d+$/))
      throw new NamedError('Client', 'Invalid id provided');
    return id;
  }
}

export default Resource;
