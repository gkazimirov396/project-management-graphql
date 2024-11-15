import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error.jsx';

import ErrorBoundary from './components/ErrorBoundary.jsx';
import App from './App.jsx';

import './index.css';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ErrorBoundary fallback={ErrorPage}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
