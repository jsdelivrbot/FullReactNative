'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Warehouse) {
  Warehouse.validatesUniquenessOf('warehousecode');
  Warehouse.beforeRemote('*', function (ctx, unused, next) {
    var arr = ['Warehouse.changeWarehouse'];
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

  Warehouse.afterRemote('**', function(ctx, result, next) {
    if(result.res['count']){
      _.extend(ctx.result, {'total': result.res['count']});
      next();
    } else {
      var where = ctx.args;
      if(ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Warehouse.count(where, function (err, count) {
        _.extend(ctx.result, {'total': count});
        next();
      })
    }
  });

  Warehouse.findWarehouse = function (filter, callback) {
    Warehouse.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };

  Warehouse.listWarehouse = function(obj, filter = '{}', callback) {
    var data = JSON.parse(obj);
    var params = JSON.parse(filter);
    var select = " Select warehouse.id, warehouse.warehousecode, warehouse.warehousename, warehouse.parentuser, warehouse.notes, warehouse.hide, warehouse.deleted, warehouse.address, warehouse.citycode, warehouse.districtcode, warehouse.wardcode, warehouse.lat, warehouse.lng, warehouse.adddate, warehouse.addwho, warehouse.editdate, warehouse.editwho,  city.cityname, district.districtname, ward.wardname ";
    var from = " from warehouse Left join city On warehouse.citycode = city.citycode "
    +"Left join district On warehouse.districtcode = district.districtcode "
    +"Left join ward On warehouse.wardcode = ward.wardcode "
    +"Where warehouse.deleted = false ";
    var orderby = " ";
    if(data.order) orderby += "Order By " + data.order;
    for (let i = 0; i < Object.keys(params).length; i++) {
      from += ' AND ' + Object.keys(params)[i] + ' ? ';
    }
    var query = data.skip ? select + from + orderby + ' LIMIT '+ parseInt(data.skip) + ',' + parseInt(data.limit) : select + from + orderby;
    Warehouse.dataSource.connector.execute(query , _.values(params), function(err, res) {
      if (err) callback(err);
      else {
        Warehouse.dataSource.connector.execute('SELECT COUNT(*) as TOTAL FROM ( ' + select + from +  ' ) tbl ', _.values(params), function(err, total) {
          if (err) callback(err);
          else {
            res['count'] = total[0].TOTAL;
            callback(null, res);
          }
        });
      }
    });
  };

  Warehouse.insertWarehouse = function (obj, callback) {
    var data = JSON.parse(obj);
    Warehouse.findOne({ where: { 'warehousecode': data.warehousecode } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Warehouse.updateAll({ 'warehousecode': data.warehousecode }, {
            'warehousename': data.warehousename,
            'parentuser': data.parentuser,
            'deleted': false,
            'notes': data.notes,
            'hide': data.hide,
            'address': data.address,
            'citycode': data.citycode,
            'districtcode': data.districtcode,
            'wardcode': data.wardcode,
            'lat': data.lat,
            'lng': data.lng,
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
        Warehouse.create({
          'warehousecode': data.warehousecode,
          'warehousename': data.warehousename,
          'parentuser': data.parentuser,
          'deleted': false,
          'notes': data.notes,
          'hide': data.hide,
          'address': data.address,
          'citycode': data.citycode,
          'districtcode': data.districtcode,
          'wardcode': data.wardcode,
          'lat': data.lat,
          'lng': data.lng,
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
  Warehouse.updateWarehouse = function (obj, callback) {
    var data = JSON.parse(obj);
    Warehouse.updateAll({ 'warehousecode': data.warehousecode }, {
      'warehousename': data.warehousename,
      'parentuser': data.parentuser,
      'deleted': data.deleted,
      'notes': data.notes,
      'hide': data.hide,
      'address': data.address,
      'citycode': data.citycode,
      'districtcode': data.districtcode,
      'wardcode': data.wardcode,
      'lat': data.lat,
      'lng': data.lng,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  Warehouse.changeWarehouse = function (obj, callback) {
    var data = JSON.parse(obj);
    var strSQL_owner = data.type === 2
    ? " SELECT distinct storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from userxrole "
    + "left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode   "
    + "left join warehouse on rolexwarehouse.warehousecode = warehouse.warehousecode   "
    + "left join rolexstorer on userxrole.rolecode = rolexstorer.rolecode and warehouse.warehousecode = rolexstorer.warehousecode   "
    + "left join storer on rolexstorer.warehousecode = storer.warehousecode and rolexstorer.storerkey = storer.storerkey   "
    + "where userxrole.deleted = false and rolexwarehouse.deleted = false and warehouse.deleted = false and warehouse.hide = false and rolexstorer.deleted = false and storer.deleted = false and storer.type = 1 and storer.warehousecode = ? and userxrole.username = ? "
    : ( (data.type === 1 || data.type === 4)
      ? " SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from storer where storer.type = 1 and storer.deleted = false and storer.warehousecode = ? and storer.parentuser = ?"
      : " SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from storer where storer.type = 1 and storer.deleted = false and storer.warehousecode = ? "
    );
    Warehouse.dataSource.connector.execute(strSQL_owner, [data.warehousecode, data.username],
      function (err_owner, res_owner) {
        if (err_owner) callback(err_owner);
        if (res_owner.length > 0) {
          var strowner = "''";
          res_owner.forEach((val, index, arr) => {
            strowner += "," + "'" + val.storerkey + "'";
          })
          var strSQL_menu = data.type === 2
          ? " SELECT menu.menucode, menu.menuurl,  SUM(rolexmenu.edit) as edit, SUM(rolexmenu.readonly) as readonly "
          + "FROM userxrole "
          + "left join rolexwarehouse on userxrole.rolecode = rolexwarehouse.rolecode  "
          + "left join rolexmenu on userxrole.rolecode = rolexmenu.rolecode  "
          + "left join menu on menu.menucode = rolexmenu.menucode  "
          + "WHERE userxrole.deleted = false and rolexwarehouse.deleted = false and rolexmenu.deleted = false  and menu.deleted = false and menu.appcode = ? and  rolexwarehouse.warehousecode = ? and userxrole.username = ? "
          + "Group by rolexmenu.menucode "
          : " SELECT menu.menucode, menu.menuurl, 1 as edit, 1 as readonly FROM menu where menu.deleted = false and menu.appcode = ?";
          Warehouse.dataSource.connector.execute(strSQL_menu, [data.appcode, data.warehousecode, data.username],
            function (err_menu, res_menu) {
              if (err_menu) callback(err_menu);
              var response = { 'owner': res_owner, 'menu': res_menu, 'strowner': strowner };
              callback(null, response);
            })
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.code = err.message = 'USER_NOT_HAVE_ACCESS_OWNER';
            callback(err);
          }
        })
      };

    };
