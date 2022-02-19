interface Array<T> {
    empty(): boolean;
}

Array.prototype.empty = function () {
  return this.length == 0;
}

interface String {
    empty(): boolean;
}

String.prototype.empty = function () {
  return this.length == 0;
}