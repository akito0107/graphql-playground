const path = require("path");
const fs = require("fs");
const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
} = require("graphql-tools");
const cors = require("cors");
const resolvers = require("./resolvers");
const mocks = require("./mocks");

const schema = makeExecutableSchema({
  typeDefs: fs
    .readFileSync(path.join(__dirname, "../schema.graphql"))
    .toString()
});

// addMockFunctionsToSchema({ schema, mocks });
addResolveFunctionsToSchema({schema, resolvers});

// Initialize the app
const app = express();

app.use(morgan('combined'));
app.use(cors());

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
});

// Start the server
app.listen(3001);
