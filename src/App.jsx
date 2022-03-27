import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import AboutPage from './pages/AboutPage/AboutPage';
import axios from 'axios';
// import Footer from './components/Footer/Footer';

function App() {


  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path='/' exact render={(routerProps) =>
            <HomePage {...routerProps} />
          } />
          <Route path='/recipe' exact render={(routerProps) =>
            <HomePage {...routerProps} />
          } />
          <Route path='/recipe/:id' render={(routerProps) =>
            <HomePage {...routerProps} />
          } />
          <Route path='/about' exact render={(routerProps) =>
            <AboutPage {...routerProps} />
          } />

        <NotFound />
        </Switch>
        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
