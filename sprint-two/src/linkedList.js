var Node = function(value) {
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  // Time Complexity: O(1)
  list.addToTail = function(value) {
    var newNode = Node(value);
    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  };

  // Time Complexity: O(1)
  list.removeHead = function() {
    if (this.head) {
      var oldHead = this.head.value;
      if (this.head.next) {
        this.head = this.head.next;
        return oldHead;
      } else {
        this.head = null;
        this.tail = null;
        return oldHead;
      }
    } 
    return undefined;
  };

  // Time Complexity: O(n)
  list.contains = function(target) {
    var pointer = this.head;
    
    while (pointer) {
      if (pointer.value === target) {
        return true;
      } else {
        pointer = pointer.next;
      }
    }
 
    return false;
  };
  
  return list;
};