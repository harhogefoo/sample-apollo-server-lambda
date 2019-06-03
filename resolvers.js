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

export default {
  Query: {
    products: async (parent, args, { db, userId }) => getProducts({ db, userId }),
    product: async (parent, { id }, { db, userId }) => getProductById({ db, userId, productId: id })
  },
  Mutation: {
    createProduct: async (parent, { product }, { db, userId }) => createProduct({ db, userId, product })
  }
}
