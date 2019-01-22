var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var table = "Project";
    
    var params = {
        TableName: table,
        Key:{
            "Title": event.title
        }
    };
    
    docClient.get(params, function(err, data) {
        console.log("titleend="+event.title);
        //callback(err, data);
        //console.log("data="+data.Item.Title);
        if(err){
            console.log("no this project");
            callback(err, null);
        }else if(data.Item.Title){
            console.log("success to search");
            console.log("data:"+data.Item.Content);
            callback(err, data);
        }else{
            console.log("no this project");
            callback(err, null);
        }
    });

};