import { render } from 'preact'
import { App } from './app'
import './index.css'
import client from './utils/apollo-client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>, 
        document.getElementById('app') as HTMLElement
    )
