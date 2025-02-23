'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
var lbContext = require('loopback-context');
module.exports = function (RolexMenu) {
  RolexMenu.validatesUniquenessOf({ scopedTo: ['rolecode', 'appcode', 'menucode'] });
  RolexMenu.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  RolexMenu.afterRemote('**', function (ctx, result, next) {
    if (result.res['count']) {
      _.extend(ctx.result, { 'total': result.res['count'] });
      next();
    } else {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      RolexMenu.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
    }
  });
  RolexMenu.findRolexMenu = function (filter, callback) {
    RolexMenu.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  RolexMenu.listRolexMenu = function (obj, filter = '{}', callback) {
    var data = JSON.parse(obj);
    var params = JSON.parse(filter);
    var _select = " SELECT A.appcode, A.menucode, menuname, CASE WHEN(edit IS NULL) THEN 0 ELSE edit END as edit,  CASE WHEN(readonly IS NULL) THEN 0 ELSE readonly END as readonly ";
    var _from = " FROM ( "
      + "SELECT menu.appcode, menu.menucode, menu.menuname "
      + "FROM menu where menu.appcode = ?  and menu.deleted = false "
      + ") A "
      + "LEFT JOIN  "
      + "( "
      + "SELECT rolexmenu.appcode, rolexmenu.menucode, rolexmenu.edit, rolexmenu.readonly from rolexmenu where rolecode = ? and rolexmenu.deleted = false "
      + ") B "
      + "ON  A.menucode = B.menucode and A.appcode = B.appcode WHERE 1 = 1 ";
    for (let i = 0; i < Object.keys(params).length; i++) {
      _from += 'AND ' + Object.keys(params)[i] + ' ? ';
    }
    RolexMenu.dataSource.connector.execute(_select + _from + ' LIMIT ?, ? ', [data.appcode, data.rolecode].concat(_.values(params)).concat([parseInt(data.skip), parseInt(data.limit)]), function (err, res) {
        if (err) callback(err);
        else {
          RolexMenu.dataSource.connector.execute('SELECT COUNT(*) as TOTAL '+ _from ,[data.appcode, data.rolecode].concat(_.values(params)), function (err, total) {
            if (err) callback(err);
            else {
              res['count'] = total[0].TOTAL;
              callback(null, res);
            }
          })
        }
      })
  };
  RolexMenu.updateRolexMenu = function (obj, callback) {
    var data = JSON.parse(obj);
    data.rolexmenu.forEach(function (value, index, arr) {
      RolexMenu.findOne({ where: { 'rolecode': data.rolecode, 'appcode': value.appcode, 'menucode': value.menucode } }).then(function (object) {
        if (object) {
          RolexMenu.updateAll({ 'rolecode': data.rolecode, 'appcode': value.appcode, 'menucode': value.menucode }, {
            'readonly': value.readonly,
            'edit': value.edit,
            'deleted': false,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function (res) {
          }).catch(function (err) {
          })
        } else {
          RolexMenu.create({
            'rolecode': data.rolecode,
            'appcode': value.appcode,
            'menucode': value.menucode,
            'readonly': value.readonly,
            'edit': value.edit,
            'deleted': false,
            'adddate': new Date().toISOString(),
            'addwho': data.currentuser
          }).then(function (res) {
          }).catch(function (err) {
          })
        }
      })
    });
    callback(null, data);
  };
  RolexMenu.deleteRolexMenu = function (obj, callback) {
    var data = JSON.parse(obj);
    RolexMenu.updateAll({ 'rolecode': data.rolecode }, {
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
