import './FavoritesPage.scss';
import { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCards from '../../components/RecipeCards/RecipeCards';
import { TabTitle } from '../../utils/GeneralFunctions';


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

        const { favoriteRecipes,  } = this.state;

        TabTitle('Faves- Simple Meal');

        return (
            <>
                <div className='fave__nav'>
                </div>
                <div className='fave__container'>
                    <h1 className='fave__title'>Favorites</h1>
                    <div className="fave__cards">
                        {favoriteRecipes && favoriteRecipes
                            .map(dataRecipeCard => (
                                <Link to={`/faves/${dataRecipeCard.id}`} key={dataRecipeCard.id}>
                                    <RecipeCards className="fave__card-item" recipe={dataRecipeCard} />
                                </Link>
                            ))}
                    </div>
                </div>
                <Link className='fave__link' to="/">
                    <p className='fave__link-back'>Back to Home Page</p>
                </Link>
            </>
        );
    }
}
