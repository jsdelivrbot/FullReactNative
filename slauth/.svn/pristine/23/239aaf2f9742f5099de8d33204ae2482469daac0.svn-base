'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function(District) {
  District.validatesUniquenessOf({scopedTo: ['citycode', 'districtcode']});
  District.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    District.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });

  District.findDistrict = function (filter, callback) {
    District.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };

  District.insertDistrict = function (obj, callback) {
    var data = JSON.parse(obj);
    District.create({
      'type': data.type,
      'citycode': data.citycode,
      'districtname': data.districtname,
      'districtcode': data.districtcode,
      'adddate': new Date().toISOString(),
      'addwho': data.addwho,
    }).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    });
  };

  District.updateDistrict = function (obj, callback) {
    var data = JSON.parse(obj);
    District.findOne({ where: { 'citycode': data.citycode, 'districtcode': data.districtcode } }).then(function (obj) {
      if (obj) {
        District.updateAll({ 'citycode': data.citycode, 'districtcode': data.districtcode }, {
          'citycode': data.citycode,
          'type': data.type,
          'districtname': data.districtname,
          'districtcode': data.districtcode,
          'editdate': new Date().toISOString(),
          'editwho': data.editwho
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
