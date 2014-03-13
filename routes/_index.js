var CONFIG = require('../config');

exports.get_url = '/';

exports.get = function(req, res){
  res.render('index', { title: CONFIG.title });
};
