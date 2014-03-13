var _ = require('lodash');
var files = ['repo', 'org'];

exports.routes = _.map(files, function(f) {
    return require('./' + f);
});
