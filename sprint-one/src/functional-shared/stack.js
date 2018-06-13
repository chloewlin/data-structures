var Stack = function() {
  var someInstance = {
    stoage: {}, 
    index: 0
  };
  extend(someInstance, stackMethods);

  return someInstance;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
}

var stackMethods = {}; 

stackMethods.push = function(value) {
  this.stoage[this.index] = value;
  this.index++;
};

stackMethods.pop = function() {
  this.index--;
  var removed = this.stoage[this.index]; 
  delete this.stoage[this.index];
  return removed;
};

stackMethods.size = function() {
  if (this.index > 0) {
    return this.index;
  }
  return 0;
};



