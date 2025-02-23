'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Menu) {
  Menu.validatesUniquenessOf('menucode', { scopedTo: ['appcode'] });
  Menu.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Menu.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    Menu.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });
  Menu.findMenu = function (filter, callback) {
    Menu.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  Menu.insertMenu = function (obj, callback) {
    var data = JSON.parse(obj);
    Menu.findOne({ where: { 'menucode': data.menucode, 'appcode': data.appcode } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Menu.updateAll({ 'menucode': data.menucode, 'appcode': data.appcode }, {
            'menuname': data.menuname,
            'menuurl': data.menuurl,
            'deleted': false,
            'notes': data.notes,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function (res) {
            data['id'] = object.id;
            callback(null, data);
          }).catch(function (err) {
            callback(err);
          })
        } else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.message = 'Data is not existed';
          callback(err);
        }
      } else {
        Menu.create({
          'appcode': data.appcode,
          'menucode': data.menucode,
          'menuname': data.menuname,
          'menuurl': data.menuurl,
          'deleted': false,
          'notes': data.notes,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function (res) {
          callback(null, res);
        }).catch(function (err) {
          callback(err);
        })
      }
    })
  };
  Menu.updateMenu = function (obj, callback) {
    var data = JSON.parse(obj);
    Menu.updateAll({ 'menucode': data.menucode, 'appcode': data.appcode }, {
      'menuname': data.menuname,
      'menuurl': data.menuurl,
      'deleted': data.deleted,
      'notes': data.notes,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };

};
