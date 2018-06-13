var Queue = function() {
  var someInstance = {
    storage: {},
    startingIndex: 0,
    endingIndex: 0
  }
  extend(someInstance, queueMethods);
  return someInstance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[this.endingIndex] = value;
  this.endingIndex++;
};

queueMethods.dequeue = function(value) {
  var removed = this.storage[this.startingIndex];
  delete this.storage[this.startingIndex];
  this.startingIndex++;
  return removed;
};

queueMethods.size = function(value) {
  if (this.endingIndex - this.startingIndex > 0) {
    return this.endingIndex - this.startingIndex;
  } 
  return 0;
};

