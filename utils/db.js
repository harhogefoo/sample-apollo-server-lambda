import AWS from 'aws-sdk'

export const getDynamoClient = event => {
  if (event.isOffline) {
    return new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
    })
  } else {
    return new AWS.DynamoDB.DocumentClient()
  }
}
