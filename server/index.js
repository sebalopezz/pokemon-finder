require('dotenv/config');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 5000;
const options = { port: PORT };

const server = new GraphQLServer({
  typeDefs: './server/graphql/schema.graphql',
  resolvers: resolvers,
});

server.start(options, () => console.log(`Server is running on http://localhost:${PORT}`))