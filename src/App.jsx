import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path= '/' exact render={(routerProps) =>
          <HomePage {...routerProps}/>
                } />
        <NotFound />
        </Switch>
        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
