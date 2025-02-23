'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
var lbContext = require('loopback-context');
module.exports = function (RolexWarehouse) {
  RolexWarehouse.validatesUniquenessOf({ scopedTo: ['rolecode', 'warehousecode'] });
  RolexWarehouse.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  RolexWarehouse.afterRemote('**', function (ctx, result, next) {
    if (result.res['count']) {
      _.extend(ctx.result, { 'total': result.res['count'] });
      next();
    } else {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      RolexWarehouse.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
    }
  });

  // new sourceversion
  RolexWarehouse.findRolexWarehouse = function (filter, callback) {
    RolexWarehouse.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  RolexWarehouse.updateRolexWarehouse = function (obj, callback) {
    var data = JSON.parse(obj);
    RolexWarehouse.dataSource.connector.execute('Update rolexwarehouse SET deleted = true Where rolecode = ? ', [data.rolecode],
      function (err_del, res_del) {
        if (err_del) callback(err_del);
        data.rolexwarehouse.forEach(function (value, index, arr) {
          RolexWarehouse.findOne({ where: { 'rolecode': data.rolecode, 'warehousecode': value.warehousecode } }).then(function (res_find) {
            if (res_find) {
              RolexWarehouse.updateAll({ 'rolecode': data.rolecode, 'warehousecode': value.warehousecode }, {
                'deleted': false,
                'adddate': new Date().toISOString(),
                'addwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            } else {
              RolexWarehouse.create({
                'rolecode': data.rolecode,
                'warehousecode': value.warehousecode,
                'deleted': false,
                'editdate': new Date().toISOString(),
                'editwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            }
          }).catch(function (err) {
            callback(err);
          })
        });
        callback(null, data);
      })
  };
  RolexWarehouse.deleteRolexWarehouse = function (obj, callback) {
    var data = JSON.parse(obj);
    RolexWarehouse.updateAll({ 'rolecode': data.rolecode }, {
      'deleted': true,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };

};
