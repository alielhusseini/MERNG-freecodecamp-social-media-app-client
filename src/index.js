import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000', // requests to this endpoint
});

// acts as middleware, for every req we are sending we add authorization key in the req body with the token value if exits (acts as interceptors.request upon creating axios.create)
const authLink = setContext((req, previousContext) => { // previousContext: we can get data from, edit and forward to the next operation   
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    headers: { authorization: token ? `Bearer ${token}` : '' }
  }
})


const client = new ApolloClient({
  //link: authLink.concat(httpLink),
  link: from([authLink, httpLink]),
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
