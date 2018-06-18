var BinarySearchTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

BinarySearchTree.prototype.insert = function(value) {
  if (value > this.value) {
    if (!this.right) {
      this.right = new BinarySearchTree(value);
    }
    this.right.insert(value);
  }
  if (value < this.value) {
    if (!this.left) {
      this.left = new BinarySearchTree(value);
    }
    this.left.insert(value);
  }
};

BinarySearchTree.prototype.contains = function(target) {
  if (target === this.value) {
    return true;
  }
  if (target > this.value) {
    if (!this.right) {
      return false;
    }
    return this.right.contains(target);
  }
  if (target < this.value) {
    if (!this.left) {
      return false;
    }
    return this.left.contains(target);
  }
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  if (this.left) {
    this.left.depthFirstLog(cb);
  }
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};

BinarySearchTree.prototype.breadthFirstLog = function(cb) {
  var queue = [this];
  while (queue.length) {
    var treeNode = queue.shift();
    // console.log(treeNode.value);
    
    cb(treeNode.value);
    
    if (treeNode.left) {
      queue.push(treeNode.left);
    }
    if (treeNode.right) {
      queue.push(treeNode.right);
    }
  }
};