// models/org.js

var Q = require('q');
// extend octonode's Org class
var github = require('octonode');

github.org.prototype.reposQ = function() {
  var self = this;
  var deferred = Q.defer();
  self.repos(function(err, repos) {
    if (err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(repos);
    }
  });
  return deferred.promise;
};
