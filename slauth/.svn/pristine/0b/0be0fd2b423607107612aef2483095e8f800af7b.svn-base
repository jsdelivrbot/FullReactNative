'use strict';
var app = require('../../server/server');
var os = require('os');
var fs = require('fs');
var rll = require('read-last-lines')

var bytesRead = 0;
var bytesWritten = 0;
var connections = 0;
var ping = 0;
var downloadspeed = 0;
var uploadspeed = 0;

module.exports = function(Stats) {
  Stats.HardwareStats = function(callback) {
    let hardware = {
      'arch': os.arch(),
      'hostname': os.hostname(),
      'platform': os.platform(),
      'type': os.type(),
      'cpus': os.cpus(),
      'networkInterfaces': os.networkInterfaces(),
      'totalmem': os.totalmem(),
      'usedmem': os.totalmem() - os.freemem(),
      'freemem': os.freemem(),
      'uptime': os.uptime()
    }
    let network = {
      'bytesRead': this.bytesRead,
      'bytesWritten': this.bytesWritten,
      'connections': this.connections,
      'ping': this.ping,
      'downloadspeed': this.downloadspeed,
      'uploadspeed': this.uploadspeed
    }
    hardware['network'] = network;
    Stats._LogStats(1, function(res){
      let log = {
        'url': res['req.url'],
        'APIResponseTime': res.APIResponseTime,
        'OverallResponseTime': res.OverallResponseTime,
        'logtime': res.time
      }
      hardware['log'] = log;
      callback(null, hardware);
    })
  };

  Stats._LogStats = function(position, callback) {
    rll.read('./log/track.log', position).then(function(lines){
      let length = lines.split(/\n/).length;
      if(position > length) {
        callback(null);
      }
      let line = lines.split(/\n/)[0];
      let res = JSON.parse(line);
      if(res['req.url'].toLowerCase().indexOf('/explorer') >= 0
      || res['req.url'].toLowerCase().indexOf('/api/stats') >= 0
      || res['req.url'].toLowerCase().indexOf('/visualize') >= 0
      || res.APIResponseTime == 'NOT_AN_API') {
        Stats._LogStats(position + 1, callback);
      } else {
        callback(res);
      }
    }).catch(function(err){
      callback(err);
    });
  };
};
