// Instantiate a new graph
var Graph = function() {
  this.nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes[node] = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodes[node] ? true : false;
};

// Removes a node from the graph.
// Edge case: should remove edges before removing node.
// If one node is removed, 
// one of the two params of .removeEdge method would be null.
Graph.prototype.removeNode = function(node) {
  for (var key in this.nodes) {
    this.removeEdge(node, key);
  }
  delete this.nodes[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  
// Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.nodes[fromNode][toNode] ? true : false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.nodes[fromNode][toNode] = true;
  this.nodes[toNode][fromNode] = true;
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this.nodes[fromNode][toNode]; 
  delete this.nodes[toNode][fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var node in this.nodes) {
    cb(node);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

/* 
 * O(1): addNode, contains, hasEdge, addEdge
 * O(n): removeNode, forEachNode
 */



// test cases
// var graph = new Graph();
// graph.addNode(4);
// graph.addNode(5);
// graph.addEdge(4, 5);
// var a = graph.hasEdge(4, 5);
// console.log(a);
// console.log(graph);
// graph.removeEdge(5);
// console.log(graph);



