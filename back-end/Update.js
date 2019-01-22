var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient()


// Update the item, unconditionally,
exports.handler = (event, context, callback) => {

var params = {
    TableName:"Project",
    Key:{
        "Title": event.title
    },
    UpdateExpression: "set Content = :r",
    ExpressionAttributeValues:{
        ":r":event.content
        /*":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]*/
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});

};