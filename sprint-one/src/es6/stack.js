class Stack {
  constructor() {
    this.obj = {};
    this.idx = 0;
  }

  push(val) {
    this.obj[this.idx] = val;
    this.idx++;
  }

  pop() {
    this.idx--;
    var removed = this.obj[this.idx];
    delete this.obj[this.idx];
    return removed;
  }

  size() {
    return this.idx > 0 ? this.idx : 0;
  } 
}

