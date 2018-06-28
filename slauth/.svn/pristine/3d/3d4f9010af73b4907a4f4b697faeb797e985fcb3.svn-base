'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function(Ward) {
  Ward.validatesUniquenessOf({scopedTo: ['districtcode', 'wardcode']});
  Ward.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    Ward.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });

  Ward.findWard = function (filter, callback) {
    Ward.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };

  Ward.insertWard = function (obj, callback) {
    var data = JSON.parse(obj);
    Ward.create({
      'districtcode': data.districtcode,
      'wardname': data.wardname,
      'wardcode': data.wardcode,
      'adddate': new Date().toISOString(),
      'addwho': data.addwho,
    }).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    });
  };

  Ward.updateWard = function (obj, callback) {
    var data = JSON.parse(obj);
    Ward.findOne({ where: { 'id': data.id } }).then(function (obj) {
      if (obj) {
        Ward.updateAll({ 'id': data.id }, {
          'districtcode': data.districtcode,
          'wardname': data.wardname,
          'wardcode': data.wardcode,
          'editdate': new Date().toISOString(),
          'editwho': data.editwho,
        }).then(function (obj) {
          callback(null, obj);
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
