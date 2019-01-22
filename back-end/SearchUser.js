var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var table = "User";
    
    var params = {
        TableName: table,
        Key:{
            "JobId": event.jobid
        }
    };
    
    docClient.get(params, function(err, data) {
        //callback(err, data);
        //console.log("data="+data.Item.Title);
        if(err){
            console.log("no this project");
            callback(err, null);
        }else if(data.Item.JobId){
            console.log("success to search");
            callback(err, data);
        }else{
            console.log("no this project");
            callback(err, null);
        }
    });

};