import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to specify the URI of your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Use setContext to set the HTTP headers for each request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so that httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client with the created link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link and the http link
  cache: new InMemoryCache(),
});

export default client;
