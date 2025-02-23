'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
var lbContext = require('loopback-context');
module.exports = function(Codelkup) {
  Codelkup.validatesUniquenessOf('parentuser', {scopedTo: ['listname', 'code']});
  Codelkup.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['Codelkup.findCodelkup'];
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
  Codelkup.afterRemote('**', function(ctx, result, next) {
      var where = ctx.args;
      if(ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Codelkup.count(where, function (err, count) {
        _.extend(ctx.result, {'total': count});
        next();
      })
  });
  Codelkup.findCodelkup = function(filter, callback) {
    Codelkup.find(JSON.parse(filter)).then(function(res){
      callback(null, res);
    }).catch(function(err){
      callback(err);
    })
  };
  Codelkup.insertCodelkup = function(obj, callback) {
    var data = JSON.parse(obj);
    Codelkup.findOne({where: {'parentuser': data.parentuser, 'listname': data.listname,'code': data.code}}).then(function(object){
      if(object) {
        if(object.deleted){
          Codelkup.updateAll({'parentuser': data.parentuser, 'listname': data.listname,'code': data.code},{
            'description': data.description,
            'short': data.short,
            'long_value': data.long_value,
            'notes': data.notes,
            'woflag': data.woflag,
            'lot1': data.lot1,
            'deleted': false,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function(res){
            data['id'] = object.id;
            callback(null, dara);
          }).catch(function(err){
            callback(err);
          });
        } else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.message = 'Data is existed';
          callback(err);
        }
      } else {
        Codelkup.create({
          'parentuser': data.parentuser,
          'listname': data.listname,
          'code': data.code,
          'description':  data.description,
          'short':  data.short,
          'long_value': data.long_value,
          'notes': data.notes,
          'woflag': data.woflag,
          'lot1': data.lot1,
          'deleted':false,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function(res){
          callback(null, res);
        }).catch(function(err){
          callback(err);
        });
      }
    })
  };
  Codelkup.updateCodelkup = function(obj, callback) {
    var data = JSON.parse(obj);
    Codelkup.updateAll({'parentuser': data.parentuser, 'listname': data.listname,'code': data.code},{
      'description': data.description,
      'short': data.short,
      'long_value': data.long_value,
      'notes': data.notes,
      'woflag': data.woflag,
      'lot1': data.lot1,
      'deleted': data.deleted,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function(res){
      callback(null, data);
    }).catch(function(err){
      callback(err);
    })
  };

};
