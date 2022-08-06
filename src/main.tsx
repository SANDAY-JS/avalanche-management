import { render } from 'preact'
import { App } from './app'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result.data));

render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>, 
        document.getElementById('app') as HTMLElement
    )
