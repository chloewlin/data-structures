class Queue {
  constructor() {
    this.obj = {};
    this.startIdx = 0;
    this.endIdx = 0;
  }

  enqueue(val) {
    this.obj[this.endIdx] = val;
    this.endIdx++;
  }

  dequeue() {
    var removed = this.obj[this.startIdx];
    delete this.obj[this.startIdx];
    this.startIdx++;
    return removed;
  }

  size() {
    var size = this.endIdx - this.startIdx;
    return size > 0 ? size : 0;
  }

}
