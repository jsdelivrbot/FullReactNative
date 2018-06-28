'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
var lbContext = require('loopback-context');
module.exports = function(Codelist) {
  Codelist.validatesUniquenessOf('parentuser', {scopedTo: ['listname']});
  Codelist.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Codelist.afterRemote('**', function(ctx, result, next) {
    var where = ctx.args;
    if(ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    Codelist.count(where, function (err, count) {
      _.extend(ctx.result, {'total': count});
      next();
    })
  });
  Codelist.findCodelist = function(filter, callback) {
    Codelist.find(JSON.parse(filter)).then(function(res){
      callback(null, res);
    }).catch(function(err){
      callback(err);
    })
  };
  Codelist.insertCodelist = function(obj, callback) {
    var data = JSON.parse(obj);
    Codelist.findOne({where: {'parentuser': data.parentuser, 'listname': data.listname}}).then(function(object){
      if(object){
        if(object.deleted){
          Codelist.updateAll({'parentuser': data.parentuser, 'listname': data.listname},{
            'description': data.description,
            'deleted': false,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function(res){
            data['id'] = object.id;
            callback(null, data);
          }).catch(function(err){
            callback(err);
          })
        } else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.message = 'Data is existed';
          callback(err);
        }
      } else {
        Codelist.create({
          'parentuser': data.parentuser,
          'listname': data.listname,
          'description': data.description,
          'deleted': false,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function(res){
          callback(null, res);
        }).catch(function(err){
          callback(err);
        })
      }
    })
  };
  Codelist.updateCodelist = function(obj, callback) {
    var data = JSON.parse(obj);
    Codelist.updateAll({'parentuser': data.parentuser, 'listname': data.listname},{
      'description': data.description,
      'deleted': data.deleted,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function(res){
      if(data.deleted){
        Codelist.dataSource.connector.execute('Update codelkup set deleted = ?, editdate = ?, editwho = ?  where parentuser = ? and listname = ? ', [data.deleted, new Date().toISOString(), data.username, data.parentuser, data.listname], function(error, response){
          if(error) {
            callback(error);
          }
          callback(null,data);
        })
      } else {
        callback(null,data);
      }
    }).catch(function(err){
      callback(err);
    })
  };

};
