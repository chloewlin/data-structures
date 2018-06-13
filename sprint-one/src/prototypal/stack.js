var Stack = function() {
  var someInstance = Object.create(stackMethods);
  someInstance.stroage = {};
  someInstance.index = 0;
  return someInstance;
};

var stackMethods = {
  push: function(value) {
    this.stroage[this.index] = value;
    this.index++;
  },
  pop: function() {
    this.index--;
    var removed = this.stroage[this.index];
    delete this.stroage[this.index];
    return removed;
  }, 
  size: function() {
    if (this.index > 0) {
      return this.index;
    }
    return 0;
  }
};



