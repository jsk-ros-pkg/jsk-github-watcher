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
};
