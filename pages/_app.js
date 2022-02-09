import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import { useApollo } from '../lib/apollo-next-client';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
