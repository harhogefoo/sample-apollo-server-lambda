# sample-apollo-server-lambda

# Setup
```
yarn
serverless dynamodb install
```

# Run
```
serverless dynamodb start
serverless offline
```

## Quit local dynamo
```
lsof -i :8000 -t | xargs kill
```
