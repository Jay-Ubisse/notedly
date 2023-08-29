require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }
    type Mutation {
      newNote(content: String!): Note!
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Jay Ubisse"
      }
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();


// Apollo Server setup
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Apply the Apollo GraphQL middleware and set the path to /api
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });
}
startServer();

app.listen({ port }, () =>
  console.log(`🚀 Server running at http://localhost:${port}/api`)
);
