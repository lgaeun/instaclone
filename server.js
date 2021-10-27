require("dotenv").config(); //최상단에 가상환경 load
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import { graphql } from "graphql";

const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      // protectedResolver,
    };
  },
});

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`);
});
