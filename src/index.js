import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000', // requests to this endpoint
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
