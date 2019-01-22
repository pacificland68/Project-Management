'use strict';

console.log('Loading function');

var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();

AWS.config.region = 'eu-west-2';

exports.handler = (event, context, callback) => {
     /*var body = JSON.parse(event.body);*/

     var params = {
          
          Item: {
               Title: event.title,
               StartTime: event.starttime,
               Leader: event.leader,
               Members: event.members,
               Content: event.content,
               Status: event.status,
               Deadline: event.deadline,
               CreateTime: event.createtime
          },

          TableName: "Project"
          
     };

     docClient.put(params, function(err, data){
          if(err){
              console.log("fail to put data");
              callback(err, null);
          }else{
              console.log("success to put data");
              docClient.scan(params, function(err, data){
                   callback(err, data);
              });
          }
                
     });
     


};