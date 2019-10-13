class Tags {
	constructor(tags, exclude) {
		this.tags = tags;
		this.exclude = exclude;
	}
	_addItem(inp, val) {
		let input = inp.toLowerCase();
		if (!this[val].includes(input)) this[val] = [...this[val], input];
	}
	_removeItem(inp, val) {
		let input = inp.toLowerCase();
		this[val] = this[val].filter(x => x !== input);
	}
	addTag(tag) {
		this._addItem(tag, "tags");
		this.removeExclude(tag);
		return this;
	}
	addExclude(exclude) {
		this._addItem(exclude, "exclude");
		this.removeTag(exclude);
		return this;
	}
	removeTag(tag) {
		this._removeItem(tag, "tags");
		return this;
	}
	removeExclude(exclude) {
		this._removeItem(exclude, "exclude");
		return this;
	}
	getTags() {
		return this.tags;
	}
	getExclude() {
		return this.exclude;
	}
}

module.exports = Tags;
