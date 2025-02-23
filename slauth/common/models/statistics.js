'use strict';
var app = require('../../server/server');
var _ = require("underscore");
var lbContext = require('loopback-context');
module.exports = function (Statistics) {
  Statistics.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Statistics.afterRemote('**', function (ctx, result, next) {
    if (result.res['count']) {
      _.extend(ctx.result, { 'total': result.res['count'] });
      next();
    } else {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Statistics.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
    }
  });
  Statistics.Total = function (obj, callback) {
    var data = JSON.parse(obj);
    var strSQL = 'SELECT year(adddate) AS year, '
      + '(SELECT count(*) FROM users WHERE users.deleted = ? and users.type = 1 AND year(users.adddate) = year) AS totalcompany, '
      + '(SELECT count(*) FROM users WHERE users.deleted = ? and users.type = 2 AND year(users.adddate) = year) AS totaluser, '
      + '(SELECT count(*) FROM warehouse WHERE warehouse.deleted = ? and year(warehouse.adddate) = year ) AS totalwarehouse, '
      + '(SELECT count(*) FROM storer WHERE storer.deleted = ? and storer.type = "1" and year(storer.adddate) = year ) AS totalowner '
      + 'FROM users GROUP BY year';

    Statistics.dataSource.connector.execute(strSQL, [data.deleted, data.deleted, data.deleted, data.deleted], function (err, res) {
      if (err) callback(err);
      callback(null, res);
    })
  };
  Statistics.TotalByCompany = function (obj, callback) {
    var data = JSON.parse(obj);
    var strSQL = 'SELECT year(adddate) AS year, '
      + '(SELECT count(*) FROM users WHERE users.parentuser = ? and users.deleted = ? and users.type = 2 AND year(users.adddate) = year) AS totaluser, '
      + '(SELECT count(*) FROM warehouse WHERE warehouse.parentuser = ? and warehouse.deleted = ? and year(warehouse.adddate) = year ) AS totalwarehouse, '
      + '(SELECT count(*) FROM storer WHERE storer.parentuser = ? and storer.deleted = ? and storer.type = "1" and year(storer.adddate) = year ) AS totalowner '
      + 'FROM users GROUP BY year ';
    Statistics.dataSource.connector.execute(strSQL, [data.parentuser, data.deleted, data.parentuser, data.deleted, data.parentuser, data.deleted], function (err, res) {
      if (err) callback(err);
      callback(null, res);
    })
  };

};
