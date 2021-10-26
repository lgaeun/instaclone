require("dotenv").config(); //최상단에 가상환경 load
import { ApolloServer, gql } from "apollo-server";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/ ✅`));
