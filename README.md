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

# Quit local dynamo
```
lsof -i :8000 -t | xargs kill
```

# Sample GraphQL
```
query {
  products {
    id
    name
    description
  }
}

query {
  product(id: "3e27dd10-85dc-11e9-a7ca-83496462799a") {
    id
    name
    description
  }
}

mutation {
  createProduct(product: { name: "hogehoge", description: "fugafuga"}) {
    name
    id
  }
}

mutation {
  updateProduct(product: { id: "c1b77ab0-85db-11e9-b5fe-5d2d2f36ee69", name: "fugafuga", description: "description"}) {
    name
  }
}
```

