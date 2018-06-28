'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function(Userxrole) {
  Userxrole.validatesUniquenessOf({scopedTo: ['username', 'rolecode']});
  Userxrole.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['UserxRole.updateUserxRole'];
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

  Userxrole.afterRemote('**', function(ctx, result, next) {
    if(result.res['count']){
      _.extend(ctx.result, {'total': result.res['count']});
      next();
    } else {
      var where = ctx.args;
      if(ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Userxrole.count(where, function (err, count) {
        _.extend(ctx.result, {'total': count});
        next();
      })
    }
  });
  Userxrole.listUserxRole = function(token, deleted, callback) {
    app.models.Token._validToken(token).then(function(result){
      Userxrole.dataSource.connector.execute('SELECT userxrole.id, userxrole.username, userxrole.rolecode, userxrole.deleted, userxrole.notes, userxrole.adddate, userxrole.addwho, userxrole.editdate, userxrole.editwho FROM userxrole WHERE userxrole.deleted = ?', [deleted], function(err, obj){
        if(err) callback(err);
        callback(null, obj);
      })
    }).catch(function(err){
      callback(err);
    })
  };

  Userxrole.saveUserxRole = function(obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._validToken(data.token).then(function(result){
      Userxrole.findOne({where: {'username': data.username, 'rolecode': data.rolecode}}).then(function(obj){
        if(obj){
          Userxrole.updateAll({'username': data.username, 'rolecode': data.rolecode},{
            'deleted': 0,
            'notes': data.notes,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function(res){
            callback(null, res);
          }).catch(function(err){
            callback(err);
          })
        } else {
          Userxrole.create({
            'username': data.username,
            'rolecode': data.rolecode,
            'deleted': 0,
            'notes': data.notes,
            'adddate': new Date().toISOString(),
            'addwho': data.currentuser
          }).then(function(res){
            callback(null, data);
          }).catch(function(err){
            callback(err);
          })
        }
      })
    }).catch(function(err){
      callback(err);
    })
  };

  Userxrole.getRolesUserxRole = function(obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._validToken(data.token).then(function(result){
      Userxrole.dataSource.connector.execute('SELECT roles.id, roles.rolecode,roles.rolename, roles.notes FROM roles left join userxrole on roles.rolecode = userxrole.rolecode where roles.deleted = ? and userxrole.username = ? and userxrole.deleted = ?', [data.deleted, data.username, data.deleted], function(err, res){
        if(err) callback(err);
        callback(null, res);
      })
    }).catch(function(err){
      callback(err);
    })
  };


  //new version
  Userxrole.findUserxRole = function(token, filter, callback) {
    app.models.Token._validToken(token).then(function(result){
      Userxrole.find(JSON.parse(filter)).then(function(obj){
        callback(null, obj);
      }).catch(function(err){
        callback(err);
      })
    }).catch(function(err){
      callback(err);
    })
  };
  Userxrole.deleteUserxrole = function(obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._validToken(data.token).then(function(result){
      Userxrole.updateAll({'username': data.username},{
        'deleted': 1,
        'editdate': new Date().toISOString(),
        'editwho': data.currentuser
      }).then(function(res){
        callback(null, data);
      }).catch(function(err){
        callback(err);
      })
    }).catch(function(err){
      callback(err);
    })
  };
  Userxrole.updateUserxRole = function(obj, callback) {
    var data = JSON.parse(obj);
    Userxrole.dataSource.connector.execute('Update userxrole SET deleted = true Where username = ? ', [data.username],
    function(err_del, res_del){
      if(err_del) callback(err_del);
      data.userxrole.forEach(function(value, index, arr){
        Userxrole.findOne({where: {'username': data.username, 'rolecode': value.rolecode}}).then(function(res_find){
          if(res_find){
            Userxrole.updateAll({'username': data.username, 'rolecode': value.rolecode},{
              'deleted': false,
              'editdate': new Date().toISOString(),
              'editwho': data.currentuser
            }).then(function(res){
            }).catch(function(err){
              callback(err);
            })
          } else {
            Userxrole.create({
              'username': data.username,
              'rolecode': value.rolecode,
              'deleted': false,
              'adddate': new Date().toISOString(),
              'addwho': data.currentuser
            }).then(function(res){
            }).catch(function(err){
              callback(err);
            })
          }
        }).catch(function(err){
          callback(err);
        })
      });
      callback(null, data);
    })
  };

};
