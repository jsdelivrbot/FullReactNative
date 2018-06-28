'use strict';
var request = require('request');

module.exports = function(Push) {
  Push.notificationPush = function(token, title, message, callback) {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :' application/json',
        'Authorization': 'key=AAAAWIkV7Og:APA91bF3DihoUgUvxeprn0aQRY7Jldb_B_sBCB9aDdiQzTuN1IwpZuSIYq3dm4GfQtbAXV_8H-gkdh0OwqFUf6VTBpaD4I3aEJkcJr-r79xIA5C__auA5EY0lkl8xjwJjFQGdVfjk2eu'
      },
      body: JSON.stringify(
        {
          "notification": {
            "title": title,
            "body": message,
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "fcm_push_icon"
          },
          "to": token,
          "data": {
            "title": title,
            "body": message,
          },
          "priority": "high"
        }
      )
    }, function(error, response, message_id) {
      if (error) {
        callback(null, error);
      } else {
        callback(null, message_id);
      }
    });
  };
};
