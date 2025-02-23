'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function(Roles) {
  Roles.validatesUniquenessOf('rolecode');
  Roles.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Roles.afterRemote('**', function(ctx, result, next) {
    var where = ctx.args;
    if(ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    Roles.count(where, function (err, count) {
      _.extend(ctx.result, {'total': count});
      next();
    })
  });
  Roles.findRoles = function(filter, callback) {
    Roles.find(JSON.parse(filter)).then(function(obj){
      callback(null, obj);
    }).catch(function(err){
      callback(err);
    })
  };
  Roles.insertRoles = function(obj, callback) {
    var data = JSON.parse(obj);
    Roles.findOne({where: {'rolecode': data.rolecode}}).then(function(object){
      if(object){
        if(object.deleted){
          Roles.updateAll({'rolecode': data.rolecode},{
            'rolename': data.rolename,
            'parentuser': data.parentuser,
            'deleted': false,
            'notes': data.notes,
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
          err.message = 'Data is not existed';
          callback(err);
        }
      } else {
        Roles.create({
          'rolecode': data.rolecode,
          'rolename': data.rolename,
          'parentuser': data.parentuser,
          'deleted': false,
          'notes': data.notes,
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
  Roles.updateRoles = function(obj, callback) {
    var data = JSON.parse(obj);
    Roles.updateAll({'rolecode': data.rolecode},{
      'rolename': data.rolename,
      'parentuser': data.parentuser,
      'deleted': data.deleted,
      'notes': data.notes,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function(res){
      callback(null, data);
    }).catch(function(err){
      callback(err);
    })
  };
  Roles.loadRoleByID = function(obj, callback) {
    var data = JSON.parse(obj);
    Roles.findOne({where: {'id': data.id, 'deleted': false}}).then(function(res_role){
      if(res_role){
        Roles.dataSource.connector.execute("SELECT warehouse.id, warehouse.warehousecode, warehouse.warehousename, warehouse.notes, warehouse.hide "
        +"From warehouse left join rolexwarehouse on warehouse.warehousecode = rolexwarehouse.warehousecode "
        +"Where warehouse.deleted = false and warehouse.hide = false and rolexwarehouse.deleted = false and rolexwarehouse.rolecode = ?", [res_role.rolecode],
        function(err_rolexwarehouse, res_rolexwarehouse){
          if(err_rolexwarehouse) callback(err_rolexwarehouse);
          var arrwarehousecode = [];
          var strwarehousecode = "''";
          res_rolexwarehouse.forEach(function(value, index, arr){
            arrwarehousecode.push(value.warehousecode);
            strwarehousecode += "," + "'" + value.warehousecode + "'";
          })
          Roles.dataSource.connector.execute("SELECT warehouse.id, warehouse.warehousecode, warehouse.warehousename, warehouse.notes, warehouse.hide "
          +"from warehouse Where warehouse.deleted = false and warehouse.hide = false and warehouse.parentuser = ? and warehouse.warehousecode NOT IN  "
          +"( "
          + strwarehousecode
          +")", [res_role.parentuser],
          function(err_warehouse, res_warehouse){
            if(err_warehouse) callback(err_warehouse);
            Roles.dataSource.connector.execute("SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable "
            +"from storer left join rolexstorer on storer.storerkey = rolexstorer.storerkey and storer.warehousecode = rolexstorer.warehousecode  "
            +"where storer.deleted = false and storer.type = '1' and  rolexstorer.deleted = false and rolexstorer.rolecode = ? and  rolexstorer.warehousecode in  "
            +"( "
            + strwarehousecode
            +")", [res_role.rolecode],
            function(err_rolexstorer, res_rolexstorer){
              if(err_rolexstorer) callback(err_rolexstorer);
              Roles.dataSource.connector.execute("SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable "
              +"From storer  "
              +"WHERE storer.deleted = false and storer.type = '1' and storer.warehousecode in  "
              +"( "
              + strwarehousecode
              +") "
              +"and concat(storer.storerkey, storer.warehousecode) not in  "
              +"( "
              +"SELECT concat(storer.storerkey, storer.warehousecode) "
              +"From storer left join rolexstorer on storer.storerkey = rolexstorer.storerkey and storer.warehousecode = rolexstorer.warehousecode  "
              +"Where storer.deleted = false and storer.type = '1' and  rolexstorer.deleted = false and rolexstorer.rolecode = ? and  rolexstorer.warehousecode in  "
              +"( "
              + strwarehousecode
              +") "
              +")", [res_role.rolecode],
              function(err_storer, res_storer){
                if(err_storer) callback(err_storer);
                var response = {'role': res_role, 'rolexwarehouse': res_rolexwarehouse, 'warehouse': res_warehouse, 'rolexstorer': res_rolexstorer, 'storer': res_storer, 'arrwarehousecode': arrwarehousecode, 'strwarehousecode': strwarehousecode};
                callback(null, response);
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

};
