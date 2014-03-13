// models/repo.js
var Q = require('q');

// extend octonode's Repo class
var github = require('octonode');
// register new API to watch
github.repo.prototype.watch = function(obj, cb) {
  return this.client.put('/repos/' + this.name + '/subscription', obj, function(err, s, b, h) {
    if (err) {
      return cb(err);
    }
    return cb(null, b, h);
  });
};

github.repo.prototype.watchQ = function(obj) {
  var self = this;
  var deferred = Q.defer();
  self.watch(obj, function(err, s) {
    if (err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(s);
    }
  });
  return deferred.promise;
};
