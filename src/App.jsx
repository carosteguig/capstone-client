import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path= '/' exact render={(routerProps) =>
          <HomePage {...routerProps}/>
                } />

        </Switch>
        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
