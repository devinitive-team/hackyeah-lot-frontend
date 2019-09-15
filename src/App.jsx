import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";

import theme from './styles/theme';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import SearchResults from './pages/SearchResults';
import Reservation from './pages/Reservation';

const client = new ApolloClient({
  uri: 'https://hackyeah-backend.nommo.dev/graphql'
});

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Navbar />
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/searchresults" component={SearchResults} />
        <Route path="/reservation" component={Reservation} />
      </Router>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
