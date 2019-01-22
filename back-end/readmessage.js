var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
    var table = "User";
    
    var params = {
        TableName: table,
        Key:{
            "JobId": event.jobid,
            "Password": event.password
            //"Date": event.Date
        }
    };
    
    docClient.get(params, function(err, data) {
        if(err){
            console.log("Unable to query");
            callback(err, null);
        }else{
            console.log("query succeeded");
            const response={
                statusCode: 302,
                headers:{
                    Location: 'https://google.com',
                }
            };
            callback(null, response);
        }
    });

};