import './App.scss';
// import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import AboutPage from './pages/AboutPage/AboutPage';
import RecipePage from './pages/RecipePage/RecipePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import FavoriteRecipeItem from './components/FavoriteRecipeItem/FavoriteRecipeItem';
// import Footer from './components/Footer/Footer';


// const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route
            path='/' exact
            render={(routerProps) =>
              <HomePage {...routerProps} />
            } />
          <Route
            path='/recipe' exact
            render={(routerProps) =>
              <RecipePage {...routerProps} />
            } />
          <Route
            path='/recipe/:id'
            render={(routerProps) =>
              <RecipePage {...routerProps} />
            } />
          <Route
            path='/about' exact
            render={(routerProps) =>
              <AboutPage {...routerProps} />
            } />
          <Route
            path='/faves' exact
            render={(routerProps) =>
              <FavoritesPage {...routerProps} />
            } />   
            <Route
            path='/faves/:id'
            render={(routerProps) =>
              <FavoriteRecipeItem {...routerProps} />
            } />             
          <NotFound />
        </Switch>
        {/* <Footer /> */}
      </Router>

    </>


  );
}


