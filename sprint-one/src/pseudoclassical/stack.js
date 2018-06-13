var Stack = function() {
  this.storage = {},
  this.index = 0;
};

Stack.prototype.push = function(value) {
  this.storage[this.index] = value;
  this.index++;
};

Stack.prototype.pop = function() {
  this.index--;
  var removed = this.storage[this.index];
  delete this.storage[this.index];
  return removed;
};

Stack.prototype.size = function() {
  if (this.index > 0) {
    return this.index;
  }
  return 0;
};


