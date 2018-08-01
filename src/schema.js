const schema =`
scalar JSON
type Query {
  createAccount: String
  logIn(password: String!) : Boolean
  accountDetails(password: String!) : JSON
}

type Mutation {
  sendMoney(password: String, fee: Float, amount: Float, address: String): JSON
}
`;

export default schema;
