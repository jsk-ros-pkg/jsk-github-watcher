var _ = require('lodash');
var files = ['_index', 'watch'];

exports.routes = _.map(files, function(f) {
    return require('./' + f);
});
