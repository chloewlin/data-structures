var Node = function(value) {
  var node = {};
  node.value = value;
  node.next = null;
  node.prev = null;
  return node;
};

var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  // Time Complexity: O(1)
  list.addToHead = function(value) {
    var newHead = new Node(value);
    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      var oldHead = this.head;
      oldHead.prev = newHead;
      this.head = newHead;
      this.head.next = oldHead;
    }
  }

  // Time Complexity: O(1)
  list.removeTail = function() {
    if (this.tail) {
      if (this.tail.prev) {
        var removedTail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return removedTail.value;
      } else {
        return this.tail.value;
      }
    } else {
      this.head = null;
      this.tail = null;
    }
    return undefined;
  }

  return list;
};