import { ApolloServer } from 'apollo-server-micro';
import prisma from '../../lib/prisma-client';
import { typeDefs, schema } from './schemas';
import { resolvers } from './resolvers';
import Cors from 'micro-cors';
import Void from '../../lib/scalar-void';

const cors = Cors();

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: { prisma } });

const startServer = apolloServer.start();

// Apollo server 3
export default cors(async function handler(req, res) {

  if (req.method === 'OPTIONS') {
    res.end()
    return false;
  }
  
  await startServer;

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

// GraphQL handles bodyParser so it's recommended to turn off
export const config = {
  api: {
    bodyParser: false
  }
};
