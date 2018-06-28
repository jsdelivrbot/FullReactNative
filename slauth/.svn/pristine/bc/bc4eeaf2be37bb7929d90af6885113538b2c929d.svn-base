'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var md5 = require('md5');
var _ = require("underscore");
var uuid = require('uuid');
module.exports = function (SysUsers) {
  SysUsers.validatesUniquenessOf('username');
  SysUsers.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['SysUsers.isSysUsers','SysUsers.signinAdmin', 'SysUsers.forgotPasswordAdmin'];
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
  SysUsers.afterRemote('**', function (ctx, result, next) {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      SysUsers.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
  });
  SysUsers.isSysUsers = function (obj, callback) {
    SysUsers.find(JSON.parse(obj)).then(function (res) {
      callback(null, res.length);
    }).catch(function (err) {
      callback(err);
    })
  };
  SysUsers.findSysUsers = function (filter, callback) {
    SysUsers.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  SysUsers.findAdmin = function (obj, callback) {
    var data = JSON.parse(obj);
    SysUsers.findOne({ where: { 'username': data.username, 'status': data.status, 'deleted': data.deleted } }).then(function (object) {
      if (object) {
        callback(null, {
          'user': object,
          'isAdmin': true
        });
      }
      else {
        app.models.Users.findOne({ where: { 'username': data.username, 'type': 1, 'status': data.status, 'deleted': data.deleted } }).then(function (_object) {
          if (_object) {
            callback(null, {
              'user': _object,
              'isAdmin': false
            });
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_EXIST';
            callback(err);
          }
        })
      }
    })
  };
  SysUsers.insertSysUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    SysUsers.findOne({ where: { 'username': data.username } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          SysUsers.updateAll({ 'username': data.username }, {
            'deleted': data.deleted,
            'tel': data.tel,
            'fullname': data.fullname,
            'email': data.email,
            'status': data.status,
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
          err.message = 'Data is existed!';
          callback(err);
        }
      } else {
        SysUsers.create({
          'username': data.username,
          'password': md5(data.password),
          'deleted': false,
          'tel': data.tel,
          'fullname': data.fullname,
          'email': data.email,
          'status': data.status,
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
  SysUsers.updateSysUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    SysUsers.updateAll({ 'username': data.username }, {
      'deleted': data.deleted,
      'tel': data.tel,
      'fullname': data.fullname,
      'email': data.email,
      'status': data.status,
      'notes': data.notes,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  SysUsers.updateAdmin = function (obj, callback) {
    var data = JSON.parse(obj);
    if (data.isadmin) {
      SysUsers.findOne({ where: { 'username': data.username } }).then(function (object) {
        if (object) {
          SysUsers.updateAll({ 'username': data.username }, {
            'deleted': data.deleted,
            'tel': data.tel,
            'fullname': data.fullname,
            'email': data.email,
            'status': data.status,
            'notes': data.notes,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function (res) {
            callback(null, {
              'user': object,
              'isAdmin': true
            });
          }).catch(function (err) {
            callback(err);
          })
        } else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.message = 'Data is not existed';
          callback(err);
        }
      }).catch(function (err) {
        callback(err);
      })
    } else {
      app.models.Users.findOne({ where: { 'username': data.username } }).then(function (object) {
        if (object) {
          app.models.Users.updateAll({ 'username': data.username }, {
            'deleted': data.deleted,
            'tel': data.tel,
            'fullname': data.fullname,
            'email': data.email,
            'status': data.status,
            'notes': data.notes,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function (res) {
            callback(null, {
              'user': object,
              'isAdmin': false
            });
          }).catch(function (err) {
            callback(err);
          })
        } else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.message = 'Data is not existed';
          callback(err);
        }
      }).catch(function (err) {
        callback(err);
      })
    }
  };
  SysUsers.resetPasswordSysUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    var password = uuid.v4().substr(0, 8);
    SysUsers.updateAll({ 'username': data.username }, {
      'password': md5(password)
    }).then(function (object) {
      app.models.UserxApp.findOne({ where: { 'username': data.username, 'deleted': false } }).then(function (_object) {
        app.models.SysMail.sendSysMail(JSON.stringify({ 'appcode': _object ? _object.appcode : 'wms', 'to': data.email, 'subject': 'Reset Password', 'body': 'Your new password is: <b>' + password + '</b>' }), (err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        })
      })
    }).catch(function (err) {
      callback(err);
    })
  };

  SysUsers.signinAdmin = function (obj, callback) {
    var data = JSON.parse(obj);
    SysUsers.findOne({ where: { 'username': data.username, 'password': md5(data.password), 'status': 1, 'deleted': false } }).then(function (object) {
      if (object) {
        app.models.Token._regisToken(data).then(function (token) {
          callback(null, {
            'user': {'fullname': object.fullname},
            'token': {'id': token.id, 'uid': token.uid },
            'isAdmin': true
          });
        }).catch(function (err) {
          callback(err);
        });

      }
      else {
        app.models.Users.findOne({ where: { 'username': data.username, 'password': md5(data.password), 'type': 1, 'status': 1, 'deleted': false } }).then(function (_object) {
          if (_object) {
            app.models.Token._regisToken(data).then(function (token) {
              callback(null, {
                'user': _object,
                'token': token,
                'isAdmin': false
              });
            }).catch(function (err) {
              callback(err);
            });
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_EXIST';
            callback(err);
          }
        }).catch(function (err) {
          callback(err);
        })
      }
    }).catch(function (err) {
      callback(err);
    })
  };
  SysUsers.forgotPasswordAdmin = function (obj, callback) {
    var data = JSON.parse(obj);
    SysUsers.findOne({ where: { 'username': data.username, 'email': data.email, 'status': 1, 'deleted': false } }).then(function (res_sysuser) {
      if (res_sysuser) {
        var password = uuid.v4().substr(0, 8);
        SysUsers.updateAll({ 'username': data.username }, {
          'password': md5(password),
          'editdate': new Date().toISOString(),
          'editwho': data.currentuser
        }).then(function (object) {
          app.models.UserxApp.findOne({ where: { 'username': data.username, 'deleted': false } }).then(function (_object) {
            app.models.SysMail.sendSysMail(JSON.stringify({ 'appcode': _object ? _object.appcode : 'wms', 'to': data.email, 'subject': 'Forgot Password', 'body': 'Your new password is: <b>' + password + '</b>' }), (err, res) => {
              if (err) {
                callback(err);
              } else {
                callback(null, res);
              }
            })
          })
        }).catch(function (err) {
          callback(err);
        })
      } else {
        app.models.Users.findOne({ where: { 'username': data.username, 'email': data.email, 'type': 1, 'status': 1, 'deleted': false } }).then(function (res_user) {
          if (res_user) {
            var password = uuid.v4().substr(0, 8);
            app.models.Users.updateAll({ 'username': data.username }, {
              'password': md5(password),
              'editdate': new Date().toISOString(),
              'editwho': data.currentuser
            }).then(function (object) {
              app.models.UserxApp.findOne({ where: { 'username': data.username, 'deleted': false } }).then(function (_object) {
                app.models.SysMail.sendSysMail(JSON.stringify({ 'appcode': _object ? _object.appcode : 'wms', 'to': data.email, 'subject': 'Forgot Password', 'body': 'Your new password is: <b>' + password + '</b>' }), (err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, res);
                  }
                })
              })
            }).catch(function (err) {
              callback(err);
            })
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_EXIST';
            callback(err);
          }
        })
      }
    })
  };
  SysUsers.changePasswordAdmin = function (obj, callback) {
    var data = JSON.parse(obj);
    if (data.isadmin) {
      SysUsers.updateAll({ 'username': data.username }, {
        'password': md5(data.password),
        'editdate': new Date().toISOString(),
        'editwho': data.currentuser
      }).then(function (res) {
        callback(null, data);
      }).catch(function (err) {
        callback(err);
      })
    } else {
      app.models.Users.updateAll({ 'username': data.username }, {
        'password': md5(data.password),
        'editdate': new Date().toISOString(),
        'editwho': data.currentuser
      }).then(function (res) {
        callback(null, data);
      }).catch(function (err) {
        callback(err);
      })
    }
  };

};
