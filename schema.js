import { gql } from 'apollo-server-lambda'

export default gql`
  type Query {
    products: [Product]
    product(id: String!): Product
  }

  type Product {
    id: String!
    name: String
    description: String
    userId: String!
  }

  input ProductInput {
    id: String
    name: String
    description: String
  }

  type Mutation {
    createProduct(product: ProductInput): Product
    updateProduct(product: ProductInput): Product
  }
`
