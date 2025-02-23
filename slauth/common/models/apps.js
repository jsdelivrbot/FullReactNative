'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Apps) {
  Apps.validatesUniquenessOf('appcode');
  Apps.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['Apps.getApps'];
    if (!arr.includes(ctx.methodString)) {
      app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
        next();
      }).catch(err => {
        return next(err);
      })
    } else {
      next();
    }
  });
  Apps.afterRemote('**', function (ctx, result, next) {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Apps.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
  });
  Apps.findApps = function (filter, callback) {
    Apps.find(JSON.parse(filter)).then(function (res) {
      callback(null, res);
    }).catch(function (err) {
      callback(err);
    })
  };
  Apps.listApps = function (obj, callback) {
    var data = JSON.parse(obj);
    var strSQL = '';
    if (data.parentuser === '') {
      strSQL = 'SELECT apps.id, apps.appcode,apps.appname, apps.notes from apps WHERE apps.deleted = ?';
    } else {
      strSQL = 'SELECT apps.id, apps.appcode,apps.appname, apps.notes from apps left join userxapp on apps.appcode = userxapp.appcode where userxapp.deleted = ? and userxapp.username = ?';
    }
    Apps.dataSource.connector.execute(strSQL, [data.deleted, data.parentuser], function (err, res) {
      if (err) callback(err);
      callback(null, res);
    })
  };
  Apps.insertApps = function (obj, callback) {
    var data = JSON.parse(obj);
    Apps.findOne({ where: { 'appcode': data.appcode } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Apps.updateAll({ 'appcode': data.appcode }, {
            'appname': data.appname,
            'deleted': false,
            'url': data.url,
            'signout_url': data.signout_url,
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
          err.message = 'Data is existed';
          callback(err);
        }
      } else {
        Apps.create({
          'appcode': data.appcode,
          'appname': data.appname,
          'deleted': false,
          'url': data.url,
          'signout_url': data.signout_url,
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
  Apps.updateApps = function (obj, callback) {
    var data = JSON.parse(obj);
    Apps.updateAll({ 'appcode': data.appcode }, {
      'appname': data.appname,
      'deleted': data.deleted,
      'url': data.url,
      'signout_url': data.signout_url,
      'notes': data.notes,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  Apps.getApps = function (obj, callback) {
    var data = JSON.parse(obj);
    Apps.dataSource.connector.execute('SELECT apps.appcode, apps.url, userxapp.username FROM apps left join userxapp on apps.appcode = userxapp.appcode where apps.deleted = false and userxapp.deleted = false and apps.appcode = ? and userxapp.username = ? ', [data.appcode, data.username], function (err, res) {
      if (err) callback(err);
      callback(null, res);
    })
  };

};
