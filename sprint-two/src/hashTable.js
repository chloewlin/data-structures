var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

// Time Complexity: best case - O(1), worst case - O(n)
HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index) || [];
  var overwrite = false;
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket[i][1] = v;
      overwrite = true;
      break;
    };
  }
  if (!overwrite) bucket.push([k, v]);
  this._storage.set(index, bucket);
};

// Time Complexity: best case - O(1), worst case - O(n)
HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index) || [];
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      return tuple[1];
    }
  }
};

// Time Complexity: best case - O(1), worst case - O(n)
HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index) || [];
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      bucket.splice(i, 1);
      return tuple[1];
    }
  }
  return undefined;
};