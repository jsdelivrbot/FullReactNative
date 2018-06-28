'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function(City) {
  City.validatesUniquenessOf('citycode');
  City.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    City.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });

  City.findCity = function (filter, callback) {
    City.find(JSON.parse(filter)).then(function (res) {
      callback(null, res);
    }).catch(function (err) {
      callback(err);
    })
  };

  City.insertCity = function (obj, callback) {
    var data = JSON.parse(obj);
    City.create({
      'citycode': data.citycode,
      'cityname': data.cityname,
      'adddate': new Date().toISOString(),
      'addwho': data.addwho
    }).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    });
  };

  City.updateCity = function (obj, callback) {
    var data = JSON.parse(obj);
    City.findOne({ where: { 'id': data.id } }).then(function (objd) {
      if (objd) {
        City.updateAll({ 'id': data.id }, {
          'citycode': data.citycode,
          'cityname': data.cityname,
          'editdate': new Date().toISOString(),
          'editwho': data.editwho
        }).then(function (objd) {
          callback(null, objd);
        }).catch(function (err) {
          callback(err);
        });
      }
      else {
        var err = new Error();
        err.statusCode = err.status = 404;
        err.message = 'Data is not existed';
        callback(err);
      }
    })
  };

};
