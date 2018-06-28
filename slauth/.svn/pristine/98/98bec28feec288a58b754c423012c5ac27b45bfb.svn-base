'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var md5 = require('md5');
var _ = require('underscore');
var uuid = require('uuid');
var lbContext = require('loopback-context');
module.exports = function (Users) {
  Users.validatesUniquenessOf('username');
  Users.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['Users.getTypeUsers', 'Users.checkToken', 'Users.checkCrossDomainToken', 'Users.signupUsers', 'Users.signupCustomer', 'Users.forgotPasswordUsers', 'Users.signinUsers', 'Users.afterSigninUsers', 'Users.afterSigninSEMUsers'];
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
  Users.afterRemote('**', function (ctx, result, next) {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Users.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
  });
  Users.findUsers = function (filter, callback) {
    var data = JSON.parse(filter);
    Users.find(data).then(function (res) {
      callback(null, res);
    }).catch(function (err) {
      callback(err);
    })

  };
  Users.insertUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.findOne({ where: { 'username': data.username } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Users.updateAll({ 'username': data.username }, {
            'parentuser': data.parentuser,
            'deleted': false,
            'tel': data.tel,
            'fullname': data.fullname,
            'email': data.email,
            'status': data.status,
            'type': data.type,
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
        Users.create({
          'username': data.username,
          'password': md5(data.password),
          'parentuser': data.parentuser,
          'deleted': false,
          'tel': data.tel,
          'fullname': data.fullname,
          'email': data.email,
          'status': data.status,
          'type': data.type,
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
  Users.resetPasswordUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    var password = uuid.v4().substr(0, 8);
    Users.updateAll({ 'username': data.username }, {
      'password': md5(password),
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
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
  Users.updateUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.updateAll({ 'username': data.username }, {
      'parentuser': data.parentuser,
      'deleted': data.deleted,
      'tel': data.tel,
      'fullname': data.fullname,
      'email': data.email,
      'status': data.status,
      'type': data.type,
      'notes': data.notes,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res_user) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.loadUserByID = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.findOne({ where: { 'id': data.id, 'status': 1, 'deleted': false } }).then(function (res_user) {
      if (res_user) {
        Users.dataSource.connector.execute('SELECT roles.id, roles.rolecode,roles.rolename FROM roles left join userxrole on roles.rolecode = userxrole.rolecode where roles.deleted = false and userxrole.deleted = false and userxrole.username = ? ', [res_user.username],
          function (err_userxrole, res_userxrole) {
            if (err_userxrole) callback(err_userxrole);
            Users.dataSource.connector.execute('SELECT roles.id, roles.rolecode,roles.rolename FROM roles where roles.deleted = false and roles.parentuser = ? and roles.rolecode NOT IN (SELECT distinct roles.rolecode FROM roles left join userxrole on roles.rolecode = userxrole.rolecode where roles.deleted = false and userxrole.deleted = false and userxrole.username = ? )', [res_user.parentuser, res_user.username],
              function (err_role, res_role) {
                if (err_role) callback(err_role);
                var strSQL_userxapp = res_user.parentuser === '' ? 'SELECT apps.id, apps.appcode,apps.appname FROM apps left join Userxapp on apps.appcode = Userxapp.appcode where apps.deleted = false and Userxapp.deleted = false and Userxapp.username = ? ' : 'SELECT apps.id, apps.appcode,apps.appname FROM apps '
                  + 'left join Userxapp child on apps.appcode = child.appcode '
                  + 'left join Userxapp parent on apps.appcode = parent.appcode '
                  + 'where apps.deleted = false and child.deleted = false and parent.deleted = false and child.username = ? and parent.username = ? ';
                Users.dataSource.connector.execute(strSQL_userxapp, [res_user.username, res_user.parentuser],
                  function (err_userxapp, res_userxapp) {
                    if (err_userxapp) callback(err_userxapp);
                    var strSQL_NOTIN_app = res_user.parentuser === '' ? 'SELECT distinct apps.appcode FROM apps left join Userxapp on apps.appcode = Userxapp.appcode where apps.deleted = false and Userxapp.deleted = false and Userxapp.username = ? ' : 'SELECT distinct apps.appcode FROM apps '
                      + 'left join Userxapp child on apps.appcode = child.appcode '
                      + 'left join Userxapp parent on apps.appcode = parent.appcode '
                      + 'where apps.deleted = false and child.deleted = false and parent.deleted = false and child.username = ? and parent.username = ? ';
                    var strSQL_app = res_user.parentuser === '' ? 'SELECT apps.id, apps.appcode,apps.appname from apps WHERE apps.deleted = false and apps.appcode NOT IN (' + strSQL_NOTIN_app + ') ' : 'SELECT apps.id, apps.appcode,apps.appname from apps left join userxapp on apps.appcode = userxapp.appcode where apps.deleted = false and userxapp.deleted = false and apps.appcode NOT IN (' + strSQL_NOTIN_app + ') and userxapp.username = ? ';
                    Users.dataSource.connector.execute(strSQL_app, [res_user.username, res_user.parentuser, res_user.parentuser],
                      function (err_app, res_app) {
                        if (err_app) callback(err_app);
                        Users.find({ where: { 'parentuser': res_user.username, 'deleted': false } }).then(function (res_listuser) {
                          var strSQL_listowner = res_user.type === 1 ? 'SELECT storer.id, storer.warehousecode, storer.storerkey, storer.company, storer.address1, storer.lottable FROM storer WHERE storer.type = "1" and storer.deleted = false and storer.parentuser = ? ' : 'SELECT distinct storer.id, storer.warehousecode, storer.storerkey, storer.company, storer.address1, storer.lottable from users '
                            + 'left join userxrole on users.username = userxrole.username '
                            + 'left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode '
                            + 'left join warehouse on rolexwarehouse.warehousecode = warehouse.warehousecode '
                            + 'left join rolexstorer on userxrole.rolecode = rolexstorer.rolecode and warehouse.warehousecode = rolexstorer.warehousecode '
                            + 'left join storer on rolexstorer.warehousecode = storer.warehousecode and rolexstorer.storerkey = storer.storerkey '
                            + 'where userxrole.deleted = false and warehouse.hide = false and storer.type = "1" and rolexstorer.deleted = false and users.username = ? ';
                          Users.dataSource.connector.execute(strSQL_listowner, [res_user.username],
                            function (err_listowner, res_listowner) {
                              if (err_listowner) callback(err_listowner);
                              app.models.Roles.find({ where: { 'parentuser': res_user.username, 'deleted': false } }).then(function (res_listrole) {
                                var strSQL_listwarehouse = res_user.type === 1 ? 'SELECT distinct warehouse.id, warehouse.warehousecode, warehouse.warehousename FROM warehouse WHERE warehouse.deleted = false and warehouse.parentuser = ? order by warehouse.warehousecode ' : 'SELECT warehouse.id, warehouse.warehousecode, warehouse.warehousename from users '
                                  + 'left join userxrole on users.username = userxrole.username '
                                  + 'left join roles on userxrole.rolecode = roles.rolecode '
                                  + 'left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode '
                                  + 'left join warehouse on rolexwarehouse.warehousecode = warehouse.warehousecode '
                                  + 'where warehouse.hide = false and userxrole.deleted = false and rolexwarehouse.deleted = false and users.username = ? order by warehouse.warehousecode ';
                                Users.dataSource.connector.execute(strSQL_listwarehouse, [res_user.username],
                                  function (err_listwarehouse, res_listwarehouse) {
                                    if (err_listwarehouse) callback(err_listwarehouse);
                                    var response = { 'user': res_user, 'userxrole': res_userxrole, 'role': res_role, 'userxapp': res_userxapp, 'app': res_app, 'listuser': res_listuser, 'listowner': res_listowner, 'listrole': res_listrole, 'listwarehouse': res_listwarehouse };
                                    callback(null, response);
                                  })
                              }).catch(function (err) {
                                callback(err);
                              })
                            })
                        }).catch(function (err) {
                          callback(err);
                        })
                      })
                  })
              })
          })
      } else {
        var err = new Error();
        err.statusCode = err.status = 404;
        err.message = 'Data is not existed!';
        callback(err);
      }
    })
  };
  Users.afterSigninUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._validToken(data.token).then(function (result) {
      Users.dataSource.connector.execute('SELECT apps.appcode, apps.url, userxapp.username FROM apps left join userxapp on apps.appcode = userxapp.appcode where apps.deleted = false and userxapp.deleted = false and userxapp.username = ? and apps.appcode = ? ', [data.username, data.appcode],
        function (err_app, res_app) {
          if (err_app) callback(err_app);
          if (res_app.length > 0) {
            var strSQL_warehouse = (data.type === 1 || data.type === 4)
              ? " SELECT warehouse.id, warehouse.warehousecode, warehouse.warehousename, warehouse.parentuser FROM warehouse where warehouse.deleted = false and warehouse.hide = false and warehouse.warehousecode IN (SELECT warehousecode FROM rolexstorer where rolexstorer.deleted = false) and warehouse.parentuser = ? "
              : " SELECT distinct warehouse.id, warehouse.warehousecode, warehouse.warehousename, warehouse.parentuser FROM userxrole "
              + "left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode "
              + "left join warehouse on rolexwarehouse.warehousecode = warehouse.warehousecode "
              + "where userxrole.deleted = false and rolexwarehouse.deleted = false and warehouse.deleted = false and warehouse.hide = false and warehouse.warehousecode IN (SELECT warehousecode FROM rolexstorer where rolexstorer.deleted = false) and userxrole.username = ? ";
            Users.dataSource.connector.execute(strSQL_warehouse, [data.username],
              function (err_warehouse, res_warehouse) {
                if (err_warehouse) callback(err_warehouse);
                if (res_warehouse.length > 0) {
                  var strSQL_owner = (data.type === 1 || data.type === 4)
                    ? " SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from storer where storer.type = 1 and storer.deleted = false and storer.warehousecode = ? and storer.parentuser = ? "
                    : " SELECT distinct storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from userxrole "
                    + "left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode "
                    + "left join warehouse on rolexwarehouse.warehousecode = warehouse.warehousecode "
                    + "left join rolexstorer on userxrole.rolecode = rolexstorer.rolecode and warehouse.warehousecode = rolexstorer.warehousecode "
                    + "left join storer on rolexstorer.warehousecode = storer.warehousecode and rolexstorer.storerkey = storer.storerkey "
                    + "where userxrole.deleted = false and rolexwarehouse.deleted = false and warehouse.deleted = false and warehouse.hide = false and rolexstorer.deleted = false and storer.deleted = false and storer.type = 1 and storer.warehousecode = ? and userxrole.username = ? ";
                  Users.dataSource.connector.execute(strSQL_owner, [res_warehouse[0].warehousecode, data.username],
                    function (err_owner, res_owner) {
                      if (err_owner) callback(err_owner);
                      if (res_owner.length > 0) {
                        var strowner = "''";
                        res_owner.forEach((val, index, arr) => {
                          strowner += "," + "'" + val.storerkey + "'";
                        })
                        var strSQL_menu = (data.type === 1 || data.type === 4)
                          ? " SELECT menu.menucode, menu.menuurl, 1 as edit, 1 as readonly FROM menu where menu.deleted = false and menu.appcode = ? "
                          : " SELECT menu.menucode, menu.menuurl, SUM(rolexmenu.edit) as edit, SUM(rolexmenu.readonly) as readonly "
                          + "FROM userxrole "
                          + "left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode "
                          + "left join rolexmenu on userxrole.rolecode = rolexmenu.rolecode "
                          + "left join menu on menu.menucode = rolexmenu.menucode "
                          + "WHERE userxrole.deleted = false and rolexwarehouse.deleted = false and rolexmenu.deleted = false and menu.deleted = false and menu.appcode = ? and rolexwarehouse.warehousecode = ? and userxrole.username = ? "
                          + "Group by rolexmenu.menucode ";
                        Users.dataSource.connector.execute(strSQL_menu, [data.appcode, res_warehouse[0].warehousecode, data.username],
                          function (err_menu, res_menu) {
                            if (err_menu) callback(err_menu);
                            var response = { 'warehouse': res_warehouse, 'owner': res_owner, 'strowner': strowner, 'menu': res_menu };
                            callback(null, response);
                          })
                      } else {
                        var err = new Error();
                        err.statusCode = err.status = 404;
                        err.code = err.message = 'USER_NOT_HAVE_ACCESS_OWNER';
                        callback(err);
                      }
                    })
                } else {
                  var err = new Error();
                  err.statusCode = err.status = 404;
                  err.code = err.message = 'USER_NOT_HAVE_ACCESS_WAREHOUSE';
                  callback(err);
                }
              })
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_HAVE_ACCESS_APP';
            callback(err);
          }
        })
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.afterSigninSEMUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._validToken(data.token).then(function (result) {
      Users.dataSource.connector.execute('SELECT apps.appcode, apps.url, userxapp.username FROM apps left join userxapp on apps.appcode = userxapp.appcode where apps.deleted = false and userxapp.deleted = false and userxapp.username = ? and apps.appcode = ? ', [data.username, data.appcode],
        function (err_app, res_app) {
          if (err_app) callback(err_app);
          if (res_app.length > 0) {
            var strSQL_menu = data.type === 1
              ? " SELECT menu.menucode, menu.menuurl, 1 as edit, 1 as readonly FROM menu where menu.deleted = false and menu.appcode = ? "
              : " SELECT menu.menucode, menu.menuurl, SUM(rolexmenu.edit) as edit, SUM(rolexmenu.readonly) as readonly "
              + "FROM userxrole "
              + "left join rolexmenu on userxrole.rolecode = rolexmenu.rolecode "
              + "left join menu on menu.menucode = rolexmenu.menucode "
              + "WHERE userxrole.deleted = false and rolexmenu.deleted = false and menu.deleted = false and menu.appcode = ? and userxrole.username = ? "
              + "Group by rolexmenu.menucode ";
            Users.dataSource.connector.execute(strSQL_menu, [data.appcode, data.username],
              function (err_menu, res_menu) {
                if (err_menu) callback(err_menu);
                var response = { 'menu': res_menu };
                callback(null, response);
              })
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_HAVE_ACCESS_APP';
            callback(err);
          }
        })
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.changePasswordUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.updateAll({ 'username': data.username }, {
      'password': md5(data.password),
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, res);
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.signoutUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    app.models.Token._deleteToken(data.username).then(function (res) {
      callback(null, res);
    }).catch(function (err) {
      callback(err);
    })
  };
  // no need token
  Users.checkToken = function (token, callback) {
    app.models.Token._validToken(token).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.checkCrossDomainToken = function (token, callback) {
    app.models.Token._validRegisToken(token).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.signupUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    var password = uuid.v4().substr(0, 8);
    Users.create({
      'username': data.username,
      'password': md5(password),
      'deleted': false,
      'fullname': data.fullname,
      'tel': data.tel,
      'email': data.email,
      'status': data.status,
      'type': data.type,
      'notes': data.notes,
      'adddate': new Date().toISOString(),
      'addwho': data.currentuser
    }).then(function (obj_user) {
      app.models.UserxApp.create({
        'username': data.username,
        'appcode': data.appcode,
        'deleted': false,
        'adddate': new Date().toISOString(),
        'addwho': data.currentuser
      }).then(function (obj_userxapp) {
        app.models.Apps.findOne({ where: { 'appcode': data.appcode, 'deleted': false } }).then(function (obj_apps) {
          app.models.SysMail.sendSysMail(JSON.stringify({ 'appcode': obj_userxapp ? obj_userxapp.appcode : 'wms', 'to': data.email, 'subject': 'Account Trial', 'body': 'Domain Info: <b>' + obj_apps.url + '</b> <br> Your UserName is: <b>' + data.username + '</b>' + '</b> <br> Your password is: <b>' + password + '</b>' }), (err, res) => {
            if (err) {
              callback(err);
            } else {
              app.models.Token._regisToken(data).then(function (token) {
                callback(null, {
                  'user': {"parentuser": '', "type": data.type, "username": data.username, "email": data.email, "tel": data.tel, "fullname": data.fullname},
                  'token': token,
                  'app': {'url': obj_apps.url}
                });
              }).catch(function (err) {
                callback(err);
              })
              // callback(null, res);
            }
          })
        }).catch(function(err){
          callback(err);
        })
      }).catch(function (err) {
        callback(err);
      })
    }).catch(function (err) {
      callback(err);
    });
  };
  Users.signupCustomer = function (obj, callback) {
    var data = JSON.parse(obj);
    var password = uuid.v4().substr(0, 8);
    Users.create({
      'username': data.username,
      'password': md5(password),
      'deleted': false,
      'fullname': data.fullname,
      'tel': data.tel,
      'email': data.email,
      'status': data.status,
      'type': 3,
      'notes': data.notes,
      'adddate': new Date().toISOString(),
      'addwho': data.currentuser
    }).then(function (obj_user) {
      app.models.UserxApp.create({
        'username': data.username,
        'appcode': data.appcode,
        'deleted': false,
        'adddate': new Date().toISOString(),
        'addwho': data.currentuser
      }).then(function (obj_userxapp) {
        app.models.UserxApp.create({
          'username': data.username,
          'rolecode': 'semdefault',
          'deleted': false,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function (obj_userxrole) {
          app.models.SysMail.sendSysMail(JSON.stringify({ 'appcode': obj_userxapp ? obj_userxapp.appcode : 'wms', 'to': data.email, 'subject': 'Reset Password', 'body': 'Your new password is: <b>' + password + '</b>' }), (err, res) => {
            if (err) {
              callback(err);
            } else {
              callback(null, res);
            }
          })
        }).catch(function (err) {
          callback(err);
        })
      }).catch(function (err) {
        callback(err);
      })
    }).catch(function (err) {
      callback(err);
    })
  };
  Users.forgotPasswordUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.findOne({ where: { 'username': data.username, 'email': data.email, 'status': 1, 'deleted': false } }).then(function (obj_user) {
      if (obj_user) {
        var password = uuid.v4().substr(0, 8);
        Users.updateAll({ 'username': data.username }, {
          'password': md5(password),
          'editdate': new Date().toISOString(),
          'editwho': data.currentuser
        }).then(function (object) {
          app.models.UserxApp.findOne({ where: { 'username': data.username, 'appcode': data.appcode, 'deleted': false } }).then(function (_object) {
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
        err.message = 'USER_NOT_EXIST';
        callback(err);
      }
    })
  };
  Users.signinUsers = function (obj, callback) {
    var data = JSON.parse(obj);
    Users.findOne({ where: { 'username': data.username, 'password': md5(data.password), 'status': 1, 'deleted': false } }).then(function (object) {
      if (object) {
        app.models.Token._regisToken(data).then(function (token) {
          callback(null, {
            'user': {"parentuser": object.parentuser, "type": object.type, "username": object.username, "email": object.email, "tel": object.tel, "fullname": object.fullname},
            'token': token
          });
        }).catch(function (err) {
          callback(err);
        })
      }
      else {
        var err = new Error();
        err.statusCode = err.status = 404;
        err.code = err.message = 'USER_NOT_EXIST';
        callback(err);
      }
    })
  };

  Users.getTypeUsers = function (obj, callback) {
    var data = JSON.parse(obj);
      Users.dataSource.connector.execute('SELECT type, parentuser from users where status = 1 and deleted = false and username  = ? ', [data.username],
        function (err, res) {
          if (err) callback(err);
          callback(null, res);
        })
    };

    Users.initDataSampleAuth = function (obj, callback) {
      var data = JSON.parse(obj);
      var prefix = shortid();
      var _global = 'TRIAL';
      app.models.Roles.create({
        'rolecode': prefix,
        'rolename': _global,
        'parentuser': data.username,
        'deleted': false,
        'notes': _global,
        'adddate': new Date().toISOString(),
        'addwho': data.currentuser
      }).then(function(resofRoles){
        app.models.Warehouse.create({
          'warehousecode': prefix,
          'warehousename': _global,
          'parentuser': data.username,
          'deleted': false,
          'notes': _global,
          'hide': 0,
          'address': data.address,
          'citycode': data.citycode,
          'districtcode': data.districtcode,
          'wardcode': data.wardcode,
          'lat': data.lat,
          'lng': data.lng,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function (resofWarehouse) {
          app.models.RolexWarehouse.create({
            'rolecode': resofRoles.rolecode,
            'warehousecode': resofWarehouse.warehousecode,
            'deleted': false,
            'editdate': new Date().toISOString(),
            'editwho': data.username
          }).then(function (resofRolexWarehouse) {
            app.models.Storer.create({
              'deleted': false,
              'warehousecode': resofWarehouse.warehousecode,
              'storerkey': prefix,
              'type': 1,
              'parentuser': data.username,
              'company': _global,
              'address1': _global,
              'lottable': JSON.stringify(data.lottable),
              'stockinfo': '',
              'freeday': '',
              'ageindays': 0,
              'notes1': _global,
              'adddate': new Date().toISOString(),
              'addwho': data.currentuser
            }).then(function (resofStorer) {
              app.models.RolexStorer.create({
                'rolecode': resofRoles.rolecode,
                'warehousecode': resofWarehouse.warehousecode,
                'storerkey': resofStorer.storerkey,
                'deleted': false,
                'adddate': new Date().toISOString(),
                'addwho': data.currentuser
              }).then(function (resofRolexstorer) {
                app.models.UserxRole.create({
                  'username': data.username,
                  'rolecode': resofRoles.rolecode,
                  'deleted': false,
                  'notes': _global,
                  'adddate': new Date().toISOString(),
                  'addwho': data.currentuser
                }).then(function(resofUserxrole){
                  app.models.Menu.find({where: {deleted: false}}).then(function (resofMenu) {
                    let arr_menuPermission = ['receipt','inbound-report', 'shipment', 'outbound-report', 'inventory-list', 'move'];
                    resofMenu.forEach((valueofRolexMenu, indexofRolexMenu, arrofRolexMenu)=>{
                      app.models.RolexMenu.create({
                        'rolecode': resofRoles.rolecode,
                        'appcode': data.appcode,
                        'menucode': valueofRolexMenu.menucode,
                        'readonly': 0,
                        'edit': arr_menuPermission.indexOf(valueofRolexMenu.menuurl) >= 0 ? 1 : 0,
                        'deleted': false,
                        'adddate': new Date().toISOString(),
                        'addwho': data.currentuser
                      }).then(function (resofRolexMenu) {
                        if(indexofRolexMenu == arrofRolexMenu.length-1) callback(null, {'warehousecode': resofWarehouse.warehousecode, 'storerkey': resofStorer.storerkey});
                      }).catch(function (err) {
                        callback(err);
                      })
                    });
                  }).catch(function (err) {
                    callback(err);
                  })
                }).catch(function(err){
                  callback(err);
                })
              }).catch(function (err) {
                callback(err);
              })
            }).catch(function (err) {
              callback(err);
            })
          }).catch(function (err) {
            callback(err);
          })
        }).catch(function(err){
          callback(err);
        })
      }).catch(function(err){
        callback(err);
      })
    };

};
