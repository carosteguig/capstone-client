import './FavoritesPage.scss';
import { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCards from '../../components/RecipeCards/RecipeCards';
// import parse from "html-react-parser";

// API key
// const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class FavoritesPage extends Component {

    //Setting state for favourites
    state = {
        favoriteRecipes: [],
    } 

    componentDidMount() {
        this.getFavoriteRecipes();
    }

    getFavoriteRecipes = (id) => {
        console.log("getSingleFaveRecipe", id);
        axios.get(`${process.env.REACT_APP_API_URL}/recipes`)
        .then((res) => { 
            console.log(res);
            this.setState({
                favoriteRecipes: res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {

        return(
            <>
            <div>
            <div>
              {this.state.favoriteRecipes && this.state.favoriteRecipes
              .map(dataRecipeCard => (
                  <Link to={`/faves/${dataRecipeCard.id}`} key={dataRecipeCard.id}>
                    <RecipeCards recipe={dataRecipeCard} />
                  </Link>
                ))}
            </div>
            </div>

            </>
        );
    }
}
