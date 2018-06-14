var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

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

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// addToTail: O(1)
// removeHead: O(1)
// contains: O(n)

var LL = new LinkedList();
LL.addToTail(4);
LL.addToTail(5);
LL.addToTail(6);
LL.removeHead();

// console.log('contains: ' + LL.contains(8));
// console.log('current head: ' + LL.head);
// console.log('current tail: ' + LL.tail.value);
// console.log('removeHead(): ' + LL.removeHead());