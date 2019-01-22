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
            "Title": ""
        }
    };
    
    docClient.scan(params, function(err, data) {
        callback(err, data);
        console.log(data.Items[0].Title);
        /*if(err){
            console.log("no this project");
            callback(err, null);
        }else if(data.Item.Title){
            console.log("success to search");
            callback(err, data);
        }else{
            console.log("no this project");
            callback(err, null);
        }*/
    });

};
