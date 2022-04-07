import './App.scss';
import './styles/partials/_globals.scss';
import './styles/partials/_resets.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import AboutPage from './pages/AboutPage/AboutPage';
import RecipePage from './pages/RecipePage/RecipePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import FavoriteRecipeItem from './components/FavoriteRecipeItem/FavoriteRecipeItem';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';

export default function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
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
            path='/faves' exact
            render={(routerProps) =>
              <FavoritesPage {...routerProps} />
            } /> 
            <Route
            path='/faves/:id'
            render={(routerProps) =>
              <FavoriteRecipeItem {...routerProps} />
            } />  
            <Route
            path='/about'
            render={(routerProps) =>
              <AboutPage {...routerProps} />
            } />           
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>

    </>


  );
}


