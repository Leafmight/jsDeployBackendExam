import express from "express";
import userFacade from "../facades/userFacadeWithDB";
const router = express.Router();
import { ApiError } from "../errors/apiError";
import authMiddleware from "../middlewares/basic-auth";
//import * as mongo from "mongodb";
import setup from "../config/setupDB";
//const MongoClient = mongo.MongoClient;
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

const USE_AUTHENTICATION = false;

(async function setupDB() {
  const client = await setup();
  userFacade.setDatabase(client);
})();

if (USE_AUTHENTICATION) {
  router.use(authMiddleware);
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    name: String
    userName: String
    role: String
    password: String
  }
 
  input UserInput {
    name: String
    userName: String
    password: String
  }
  
  type Query {
    users : [User]!
  }
  type Mutation {
    createUser(input: UserInput): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  users: async () => {
    const users = await userFacade.getAllUsers();
    const usersDTO = users.map((user) => {
      const { name, userName, role } = user;
      return { name, userName, role };
    });
    return usersDTO;
  },
};

router.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;

//localhost:8080/graphql
