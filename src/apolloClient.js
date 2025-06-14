import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

// Create an http link
const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql', // Update with your GraphQL server URL
});

// Create a middleware link to add the token to the headers
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');
  // Add the token to the headers if it exists
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the auth link with the http link
  cache: new InMemoryCache(),
});

export default client; 