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
  req.session.github_code = values.code;
  res.render('authorized', {
    title: CONFIG.title,
    done: false
  });
  // github.auth.login(values.code, function(err, token) {
  //   console.log('login done');
  //   var client = github.client(token);
  //   var org_promises = _.map(CONFIG.orgs, function(org) {
  //     console.log('creating promise for ' + org);
  //     var org_deferred = Q.defer();
  //     var ghorg  = client.org(org);
  //     ghorg.repos(function(err, repos) {
  //       if (err) {
  //         org_deferred.reject(err);
  //       }
  //       else {
  //         var repos_promises = _.map(repos, function(repo) {
  //           console.log('creating promise for ' + repo.name);
  //           var ghrepo = client.repo(util.format('%s/%s', org, repo.name));
  //           var deferred = Q.defer();
  //           ghrepo.watch({subscribed: true}, function(err, result) {
  //             if (err) {
  //               deferred.reject(err);
  //             }
  //             else {
  //               ghrepo.prs(function(err, result) {
  //                 if (err) {
  //                   deferred.reject(err);
  //                 }
  //                 else {
  //                   console.log(result.length);
  //                   repo.pr_num = result.length;
  //                   deferred.resolve(repo);
  //                 }
  //               });
  //             }
  //           });
  //           return deferred.promise;
  //         });
  //         Q.allSettled(repos_promises).then(function(results) {
  //           org_deferred.resolve(_.map(results, function(r) { return r.value; }));
  //         }).fail(function(err) {
  //           org_deferred.reject(err);
  //         });
  //       }
  //     });
  //     return org_deferred.promise;
  //   });
  //   Q.allSettled(org_promises)
  //     .then(function(results) {
  //       console.log(results[0]);
  //       res.render('repos_info', {
  //         title: CONFIG.title,
  //         orgs_infos: results
  //       });
  //     })
  //     .fail(function(errors) {
  //       next(errors);
  //     });
  // });
};
