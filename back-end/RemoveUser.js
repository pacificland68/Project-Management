var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
var table = "User";

var params = {
    TableName:table,
    Key:{
        "JobId": event.jobid
    },
    ConditionExpression:"JobId = :val",
    ExpressionAttributeValues: {
        ":val": event.jobid
    }
};


console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
}