import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql' // requests to this endpoint
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        MERNG
      </div>
    </ApolloProvider>
  );
}

export default App;
