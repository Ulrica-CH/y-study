class Scope {
  constructor(options) {
    this.name = options.name;
    this.parent = options.parent;
    this.scopes = options.scopes;
  }

  add(scope) {
    this.scopes.push(scope);
  }

  findDefiningScope(name) {
    if (this.scopes.includes(name)) {
      return this;
    } else if (this.parent) {
      return this.parent.findDefiningScope(name);
    } else {
      return null;
    }
  }
}
module.exports = Scope;
