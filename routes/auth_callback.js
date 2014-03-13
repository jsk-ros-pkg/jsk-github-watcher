var _ = require('lodash');
var util = require('util');
var CONFIG = require('../config');
var github = require('octonode');
var qs = require('querystring');
var url = require('url');
var Q = require('q');

exports.get_url = '/auth_callback';
exports.get = function(req, res, next) {
  var uri = url.parse(req.url);
  var values = qs.parse(uri.query);
  github.auth.login(values.code, function(err, token) {
    var client = github.client(token);
    var org_promises = _.map(CONFIG.orgs, function(org) {
      var ghorg  = client.org(org);
      // unfortunately, 'watch' is not implemented yet
      var repo_promises = ghorg.reposQ(function(err, repos, headers) {
        return _.map(repos, function(repo) {
          var ghrepo = client.repo(util.format('%s/%s', org, repo.name));
          var deferred = Q.defer();
          ghrepo.watch({subscribed: true}, function(err, result) {
            if (err) {
              deferred.reject(err);
            }
            else {
              deferred.resolve(repo);
            }
          });
          return deferred.promise;
        });
      });
      return repo_promises;
    });
    var all_watch_promises = _.flatten(org_promises);
    Q.allSettled(all_watch_promises)
      .then(function(results) {
        res.render('repos_info', {
          title: CONFIG.title,
          orgs_infos: results
        });
      })
      .fail(function(errors) {
        next(errors);
      });
  });
};

