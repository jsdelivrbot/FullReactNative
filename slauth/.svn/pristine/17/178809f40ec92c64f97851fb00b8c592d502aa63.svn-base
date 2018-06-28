'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require('underscore');

module.exports = function(Domain) {
  Domain.validatesUniquenessOf('code');

  Domain.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });

  Domain.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    Domain.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });

  Domain.findDomain = function (filter, callback) {
    Domain.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };

  Domain.insertDomain = function (obj, callback) {
    var data = JSON.parse(obj);
    Domain.findOne({ where: { 'code': data.code } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Domain.updateAll({ 'code': data.code }, {
            'parentuser': data.parentuser,
            'url': data.url,
            'deleted': false,
            'parentuser': data.parentuser,
            'description': data.description,
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
        Domain.create({
          'code': data.code,
          'parentuser': data.parentuser,
          'url': data.url,
          'deleted': false,
          'parentuser': data.parentuser,
          'description': data.description,
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

  Domain.updateDomain = function (obj, callback) {
    var data = JSON.parse(obj);
    Domain.updateAll({ 'code': data.code }, {
      'parentuser': data.parentuser,
      'url': data.url,
      'deleted': data.deleted,
      'parentuser': data.parentuser,
      'description': data.description,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };

};
