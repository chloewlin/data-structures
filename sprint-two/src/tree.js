var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.children = [];  

  extend(newTree, treeMethods);
  return newTree;
};
 
var extend = function(to, from) {
  for (key in from) {
    to[key] = from[key];
  }
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  this.children.push(child);
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  }

  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(target)) {
      return true;
    }
  }
  return false;
};




/*
 * Complexity: What is the time complexity of the above functions?
 */

//  var tree = Tree(1);

//  console.log(tree);