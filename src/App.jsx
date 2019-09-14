import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import SearchResults from './pages/SearchResults';
import Reservation from './pages/Reservation';

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <Navbar />
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/searchresults" component={SearchResults} />
        <Route path="/reservation" component={Reservation} />
      </Router>
    </>
  </ThemeProvider>
);

export default App;
