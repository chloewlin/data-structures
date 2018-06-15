// Instantiate a new graph
var Graph = function() {
  this.nodes = {};
};

// Add a node to the graph, passing in the node's value.
// Time Complexity: O(1)
Graph.prototype.addNode = function(node) {
  this.nodes[node] = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
// Time Complexity: O(1)
Graph.prototype.contains = function(node) {
  return this.nodes[node] ? true : false;
};

// Removes a node from the graph.
// Edge case: should remove edges before removing node.
// If one node is removed, 
// one of the two params of .removeEdge method would be null.
// Time Complexity: O(n)
Graph.prototype.removeNode = function(node) {
  for (var key in this.nodes) {
    this.removeEdge(node, key);
  }
  delete this.nodes[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  
// Pass in the values contained in each of the two nodes.
// Time Complexity: O(1)
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.nodes[fromNode][toNode] ? true : false;
};

// Connects two nodes in a graph by adding an edge between them.
// Time Complexity: O(1)
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.nodes[fromNode][toNode] = true;
  this.nodes[toNode][fromNode] = true;
};

// Remove an edge between any two specified (by value) nodes.
// Time Complexity: O(1)
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this.nodes[fromNode][toNode]; 
  delete this.nodes[toNode][fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
// Time Complexity: O(n) 
Graph.prototype.forEachNode = function(cb) {
  for (var node in this.nodes) {
    cb(node);
  }
};


/* 
 * O(1): addNode, contains, hasEdge, addEdge
 * O(n): removeNode, forEachNode
 */