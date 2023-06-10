interface IDictionary {
  add(key: string, value: any): void;
  remove(key: string): void;
  containsKey(key: string): boolean;
  keys(): string[];
  values(): any[];
}

class Dictionary {
  private _keys: string[] = [];
  private _values: any[] = [];

  add(key: string, value: any) {
    if (!this._keys.includes(key)) {
      this[key] = value;
      this._keys.push(key);
      this._values.push(value);
    }else{
      this._keys.pop();
      this._values.pop();
      this._keys.push(key);
      this._values.push(value);
    }
  }

  remove(key: string) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);

    delete this[key];
  }

  keys(): string[] {
    return this._keys;
  }

  values(): any[] {
    return this._values;
  }

  containsKey(key: string) {
    if (typeof this[key] === "undefined") {
      return false;
    }

    return true;
  }

  lookup(): IDictionary {
    return this;
  }
}

export default Dictionary;
