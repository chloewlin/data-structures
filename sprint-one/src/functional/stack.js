var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var index = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    storage[index] = value;
    index++;
  };

  someInstance.pop = function() {
    index--;
    var removed = storage[index];
    delete storage[index];
    return removed;
  };

  someInstance.size = function() {
    if (index > 0) {
      return index;
    }
    return 0;
  };

  return someInstance;
};
