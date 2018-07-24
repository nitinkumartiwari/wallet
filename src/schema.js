const schema =`
scalar JSON
type Query {
  createAccount: String
  validateAccount(password: String!) : Boolean
  accountDetails(password: String!) : JSON
}

type Mutation {
  sendMoney(password: String): JSON
}
`;

export default schema;
