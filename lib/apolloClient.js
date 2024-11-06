import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;
