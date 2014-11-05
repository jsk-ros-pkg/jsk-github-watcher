var _ = require('lodash');
var files = ['_index', 'watch', 'auth_callback', 'auth.js'];

exports.routes = _.map(files, function(f) {
    return require('./' + f);
});
