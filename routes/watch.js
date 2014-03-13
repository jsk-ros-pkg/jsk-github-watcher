var _ = require('lodash');
var CONFIG = require('../config');
var GitHubApi = require('github');

var github = new GitHubApi({
    // required
    version: '3.0.0',
    // optional
    debug: true,
    protocol: 'https',
    host: 'jsk-github-watcher.herokuapp.com',
    pathPrefix: '/api/v3', // for some GHEs
    timeout: 5000
});

github.authenticate({
  type: 'oauth',
  key: CONFIG.auth.client_id,
  secret: CONFIG.auth.client_secret
});


exports.get_url = '/watch';

exports.get = function(req, res, next) {
  github.authorization.create({
    scopes: ['user', 'public_repo', 'repo', 'repo:status', 'gist'],
    note: 'what this auth is for',
    note_url: 'http://jsk-github-watcher.herokuapp.com/',
    headers: {
      'X-GitHub-OTP': 'two-factor-code'
    }
  }, function(err, res) {
    if (err) {
      next(err);
    }
    else if (res.token) {
      //save and use res.token as in the Oauth process above from now on
      console.log(req.token);
    }
  });
};
