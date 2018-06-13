var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var endingIndex = 0;
  var startingIndex = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {  
    storage[endingIndex] = value;
    endingIndex++;
  };

  someInstance.dequeue = function() {
    var removed = storage[startingIndex];
    delete storage[startingIndex];
    startingIndex++; 
    return removed;
  };

  someInstance.size = function() {
    if (endingIndex - startingIndex > 0) { 
      return endingIndex - startingIndex;
    }
    return 0;
  };

  return someInstance;
};
