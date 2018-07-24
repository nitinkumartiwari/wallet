import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import schema from './schema';


const resolvers = {
  JSON: GraphQLJSON,
};

const myGraphQLSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

export {
  myGraphQLSchema,
};
