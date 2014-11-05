var _ = require('lodash');
var util = require('util');
var CONFIG = require('../config');
var github = require('octonode');
var qs = require('querystring');
var url = require('url');
var Q = require('q');

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


exports.get_url = '/watch/:org';

exports.get = function(req, res, next) {
  var code = req.session.github_code;
  var org = req.params.org;
  var repos_count = 0;
  console.log(org);
  github.auth.login(code, function(err, token) {
    console.log('login done');
    var client = github.client(token);
    var org_promises = _.map([org], function(org) {
      console.log('creating promise for ' + org);
      var org_deferred = Q.defer();
      var ghorg  = client.org(org);
      ghorg.repos({
        page: 1,
        per_page: 1000
      }, function(err, repos) {
        if (err) {
          org_deferred.reject(err);
        }
        else {
          repos_count = repos.length;
          console.log(repos.length + " repositories");
          var repos_promises = _.map(repos, function(repo) {
            console.log('creating promise for ' + repo.name);
            var ghrepo = client.repo(util.format('%s/%s', org, repo.name));
            var deferred = Q.defer();
            ghrepo.watch({subscribed: true}, function(err, result) {
              console.log("watching " + repo.name + " done");
              if (err) {
                deferred.reject(err);
              }
              else {
                deferred.resolve(repo);
              }
            });
            return deferred.promise;
          });
          Q.allSettled(repos_promises).then(function(results) {
            org_deferred.resolve(_.map(results, function(r) { return r.value; }));
          }).fail(function(err) {
            org_deferred.reject(err);
          });
        }
      });
      return org_deferred.promise;
    });
    Q.allSettled(org_promises)
      .then(function(results) {
        res.render('authorized', {
          title: CONFIG.title,
          done: true,
          done_count: repos_count
        });
      })
      .fail(function(errors) {
        next(errors);
      });
  });
};
