var Queue = function() {
  var someInstance = Object.create(queueMethods);
  someInstance.endingIndex = 0;
  someInstance.startingIndex = 0;
  someInstance.storage = {};
  return someInstance;
};

var queueMethods = {
  enqueue: function(value){
    this.storage[this.endingIndex] = value; 
    this.endingIndex++;
  },
  dequeue: function(){
    var result = this.storage[this.startingIndex];
    delete this.storage[this.startingIndex];
    this.startingIndex++;
    return result;
  },
  size: function(){
    if (this.endingIndex - this.startingIndex > 0){
      return this.endingIndex - this.startingIndex;
    }
    return 0;
  }
};




