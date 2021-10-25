require("dotenv").config(); //최상단에 가상환경 load
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjM1MTQ5MjE5fQ.NWQSCs7nylTAjP0d76XEHvnMd-WfFJUFRt-KDYRVtYo",
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/ ✅`));
