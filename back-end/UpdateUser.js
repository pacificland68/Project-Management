var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient()


// Update the item, unconditionally,
exports.handler = (event, context, callback) => {
var params = {
    TableName:"User",
    Key:{
        "JobId": event.jobid
    },
    UpdateExpression: "set #Name=:n, #Role=:r, #Skills=:sk",
    ExpressionAttributeValues:{
        ":n":event.name,
        ":r":event.role,
        ":sk":event.skills
    },
    ExpressionAttributeNames: {
        "#Name": "Name",
        "#Role": "Role",
        "#Skills": "Skills"
  },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
console.log("jobid="+event.jobid);
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        callback(err, data);
    }
});

};