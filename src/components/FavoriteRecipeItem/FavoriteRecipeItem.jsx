import './FavoriteRecipeItem.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";
import { Redirect } from 'react-router-dom';
import Servings from '../../assets/images/icons/servings2.png';
import Time from '../../assets/images/icons/clock-recipes.png';

// API key
const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class FavoriteRecipeItem extends Component {

    // Setting state for single recipe
    state = {
        selectedFaveRecipe: {},
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
            })
            .catch((err) => console.log(err));
    }


    render() {
        // console.log(this.state.selectedRecipe.id);
        return (
            <>
                <div className='favorite__nav'>
                </div>
                <header className='favorite__header'>
                    <div className='favorite__title'>
                        <h1 className='favorite__title-text'>{this.state.selectedFaveRecipe.title}</h1>
                    </div>

                    <div className='favorite__container'>
                        <div className='favorite__info'>
                            <div className='favorite__info-box'>
                                <img className='favorite__info-icon' src={Servings} alt='meal plate' />
                                <h4 className='favorite__info-text'>{this.state.selectedFaveRecipe.servings} Servings</h4>
                            </div>
                            <div className='favorite__info-box'>
                                <img className='favorite__info-icon' src={Time} alt='clock' />
                                <h4 className='favorite__info-text'>Ready in {this.state.selectedFaveRecipe.readyInMinutes} min.</h4>
                            </div>
                        </div>
                        <div className='favorite__img-section'>
                            <div className="favorite__img-overlay"></div>
                            <img className='favorite__img-photo' src={this.state.selectedFaveRecipe.image} alt={this.state.selectedFaveRecipe.title} />
                        </div>
                    </div>
                </header>
                <main className='main-fav__container'>
                    <div className='main-fav__container-section'>
                        <p className='main-fav__container-text'>{parse(`${this.state.selectedFaveRecipe.summary}`)}</p>
                        <div className='main-fav__container-list--ing'>
                            <h3 className='main-fav__container-title'>Ingredients</h3>
                            {/* Collecting ingreadients from objects inside and array */}
                            <ul className='main-fav__container-items'>
                                {this.state.selectedFaveRecipe.extendedIngredients &&
                                    this.state.selectedFaveRecipe.extendedIngredients.map(
                                        (ingredient) => <li className='main-fav__container-item' key={ingredient.id}>{ingredient.original}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className='main-fav__container-list--stps'>
                        <h3 className='main-fav__container-title main-fav__container-title--steps'>Steps</h3>
                        {/* Collecting steps instruction from objects inside and array */}
                        <ol className='main-fav__container-steps'>
                        {this.state.selectedFaveRecipe.analyzedInstructions &&
                            this.state.selectedFaveRecipe.analyzedInstructions[0].steps.map(
                                (step) => <li className='main-fav__container-step' key={step.number}>{step.step}</li>)}
                    </ol>
                    </div>
                    <button className='main-fav__container-btn' onClick={this.deleteRecipe}>Delete</button>
                </main>
            </>
        );
    }
}


{/* <img src={this.state.selectedFaveRecipe.image} alt={this.state.selectedFaveRecipe.title} />
                <main>

                    <h4>Servings: {this.state.selectedFaveRecipe.servings}</h4>
                    <h4>Prep time: {this.state.selectedFaveRecipe.readyInMinutes} minutes</h4>
                    {parse(`${this.state.selectedFaveRecipe.summary}`)}
                    <h3>Ingredients</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    // <ul>
                    //     {this.state.selectedFaveRecipe.extendedIngredients &&
                    //         this.state.selectedFaveRecipe.extendedIngredients.map(
                    //             (ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}

                    // </ul>
                    // <h3>Steps</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                //     <ol>
                //         {this.state.selectedFaveRecipe.analyzedInstructions &&
                //             this.state.selectedFaveRecipe.analyzedInstructions[0].steps.map(
                //                 (step) => <li key={step.number}>{step.step}</li>)}

                //     </ol>
                //     <button onClick={this.deleteRecipe}>Delete</button>


                // </main> */}