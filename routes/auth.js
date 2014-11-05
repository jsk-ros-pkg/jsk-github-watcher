var _ = require('lodash');
var util = require('util');
var CONFIG = require('../config');
var github = require('octonode');

github.repo.prototype.watch = function(obj, cb) {
  return this.client.put('/repos/' + this.name + '/subscription', obj, function(err, s, b, h) {
    if (err) {
      return cb(err);
    }
    return cb(null, b, h);
  });
};


var auth_url = github.auth.config({
  id: CONFIG.auth.client_id,
  secret: CONFIG.auth.client_secret,
}).login(['public_repo', 'repo']);


exports.get_url = '/auth';

exports.get = function(req, res, next) {
  res.writeHead(301, {'Content-Type': 'text/plain', 'Location': auth_url});
  res.end('Redirecting to ' + auth_url);
};
