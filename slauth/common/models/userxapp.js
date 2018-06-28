'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Userxapp) {
  Userxapp.validatesUniquenessOf({ scopedTo: ['username', 'appcode'] });
  Userxapp.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Userxapp.afterRemote('**', function (ctx, result, next) {
    if (result.res['count']) {
      _.extend(ctx.result, { 'total': result.res['count'] });
      next();
    } else {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Userxapp.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
    }
  });

  // new version
  Userxapp.findUserxApp = function (filter, callback) {
    Userxapp.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  Userxapp.updateUserxApp = function (obj, callback) {
    var data = JSON.parse(obj);
    Userxapp.dataSource.connector.execute('Update userxapp SET deleted = true Where username = ? ', [data.username],
      function (err_del, res_del) {
        if (err_del) callback(err_del);
        data.userxapp.forEach(function (value, index, arr) {
          Userxapp.findOne({ where: { 'username': data.username, 'appcode': value.appcode } }).then(function (res_find) {
            if (res_find) {
              Userxapp.updateAll({ 'username': data.username, 'appcode': value.appcode }, {
                'deleted': false,
                'editdate': new Date().toISOString(),
                'editwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            } else {
              Userxapp.create({
                'username': data.username,
                'appcode': value.appcode,
                'deleted': false,
                'adddate': new Date().toISOString(),
                'addwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            }
          }).catch(function (err) {
            callback(err);
          })
        })
        callback(null, data);
      })
  };
  Userxapp.deleteUserxApp = function (obj, callback) {
    var data = JSON.parse(obj);
    Userxapp.updateAll({ 'username': data.username }, {
      'deleted': true,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  Userxapp.queryUserxApp = function (obj, callback) {
    var data = JSON.parse(obj);
    Userxapp.dataSource.connector.execute('SELECT apps.appcode, apps.appname FROM userxapp left join apps on userxapp.appcode = apps.appcode where apps.deleted = false and userxapp.deleted =  false and userxapp.username = ? ', [data.username],
      function (err, res) {
        if (err) callback(err);
        callback(null, res);
      })
  };

};
