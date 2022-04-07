import './FavoriteRecipeItem.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Servings from '../../assets/images/icons/servings2.png';
import Time from '../../assets/images/icons/clock-recipes.png';

// API key
const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class FavoriteRecipeItem extends Component {

    // Setting state for single recipe
    state = {
        selectedFaveRecipe: {},
        redirect: false,
    }

    componentDidMount() {
        // Using dinamic id collected using props.match from the gerRecipesByIngredients API call function
        this.getSingleFaveRecipe(this.props.match.params.id);
    }

    // Getting single recipe
    getSingleFaveRecipe = (id) => {
        console.log("getSingleFaveRecipe", id);
        axios
            .get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            )
            .then((res) => {
                console.log(res);
                this.setState({
                    selectedFaveRecipe: res.data,                   
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }




    // delete recipes from page
    deleteRecipe = () => {
        const recipeId = this.state.selectedFaveRecipe.id;
        console.log(this.state.selectedFaveRecipe.id);
        // Delete fave recipe to server
        axios
            .delete(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}/delete`)
            .then((res) => {
                console.log(res.data);
                console.log('"your recipe has been deleted from Faves"');
                this.setState({redirect: true})
            })
            .catch((err) => console.log(err));
    }


    render() {

        const { selectedFaveRecipe, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/faves" />
        }

        return (
            <>
                <div className='favorite__nav'>
                </div>
                <header className='favorite__header'>
                    <div className='favorite__title'>
                        <h1 className='favorite__title-text'>{selectedFaveRecipe.title}</h1>
                    </div>

                    <div className='favorite__container'>
                        <div className='favorite__info'>
                            <div className='favorite__info-box'>
                                <img className='favorite__info-icon' src={Servings} alt='meal plate' />
                                <h4 className='favorite__info-text'>{selectedFaveRecipe.servings} Servings</h4>
                            </div>
                            <div className='favorite__info-box'>
                                <img className='favorite__info-icon' src={Time} alt='clock' />
                                <h4 className='favorite__info-text'>Ready in {selectedFaveRecipe.readyInMinutes} min.</h4>
                            </div>
                        </div>
                        <div className='favorite__img-section'>
                            <div className="favorite__img-overlay"></div>
                            <img className='favorite__img-photo' src={selectedFaveRecipe.image} alt={selectedFaveRecipe.title} />
                        </div>
                    </div>
                </header>
                <main className='main-fav__container'>
                    <div className='main-fav__container-section'>
                        <p className='main-fav__container-text'>{parse(`${selectedFaveRecipe.summary}`)}</p>
                        <div className='main-fav__container-list--ing'>
                            <h3 className='main-fav__container-title'>Ingredients</h3>
                            {/* Collecting ingreadients from objects inside and array */}
                            <ul className='main-fav__container-items'>
                                {selectedFaveRecipe.extendedIngredients &&
                                    selectedFaveRecipe.extendedIngredients.map(
                                        (ingredient) => <li className='main-fav__container-item' key={ingredient.id}>{ingredient.original}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className='main-fav__container-list--stps'>
                        <h3 className='main-fav__container-title main-fav__container-title--steps'>Steps</h3>
                        {/* Collecting steps instruction from objects inside and array */}
                        <ol className='main-fav__container-steps'>
                        {selectedFaveRecipe.analyzedInstructions &&
                            selectedFaveRecipe.analyzedInstructions[0].steps.map(
                                (step) => <li className='main-fav__container-step' key={step.number}>{step.step}</li>)}
                    </ol>
                    </div>
                    <div>
                        
                    </div>
                    <button className='main-fav__container-btn' onClick={this.deleteRecipe}>Delete</button>
                    <Link className='fave-item__link' to="/faves">
                        <p className='fave-item__link-back'>Back to Faves Page</p>
                    </Link>
                </main>
            </>
        );
    }
}
