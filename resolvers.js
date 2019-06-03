import uuid from 'uuid'

const getProducts = async ({ db, userId }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    ExpressionAttributeNames: {'#userId': 'userId'},
    ExpressionAttributeValues: {':userId': userId},
    KeyConditionExpression: '#userId = :userId',
    IndexName: 'userIdGSI',
  }
  const { Items } = await db.query(params).promise()
  return Promise.resolve(Items)
}

const getProductById = async ({ db, userId, productId }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: productId, userId: userId }
  }
  const { Item } = await db.get(params).promise()
  return Promise.resolve(Item)
}

const createProduct = async ({ db, userId, product }) => {
  const {
    name,
    description
  } = product
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid.v1(),
      name,
      description,
      userId,
      createdAt: Date.now(),
    }
  }
  await db.put(params).promise()
  return params.Item
}

const updateProduct = async ({ db, userId, product }) => {
  const { id, name, description } = product
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id, userId },
    UpdateExpression: "set #n = :n, #d = :d, #p = :p",
    ExpressionAttributeNames: {
      "#n": "name",
      "#d": "description",
      "#p": "price"
    },
    ExpressionAttributeValues: {
        ":n": name,
        ":d": description,
        ":p": 100
    },
    ReturnValues: "ALL_NEW"
  }

  const { Attributes } = await db.update(params).promise()
  return Attributes
}

export default {
  Query: {
    products: async (parent, args, { db, userId }) => getProducts({ db, userId }),
    product: async (parent, { id }, { db, userId }) => getProductById({ db, userId, productId: id })
  },
  Mutation: {
    createProduct: async (parent, { product }, { db, userId }) => createProduct({ db, userId, product }),
    updateProduct: async (parent, { product }, { db, userId }) => updateProduct({ db, userId, product })
  }
}
