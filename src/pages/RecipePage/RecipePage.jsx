import './RecipePage.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Servings from '../../assets/images/icons/servings2.png';
import Time from '../../assets/images/icons/clock-recipes.png';

// API key
const apiKey= process.env.REACT_APP_API_KEY;

export default class RecipePage extends Component {

    // Setting state for single recipe
    state = {
        selectedRecipe: {},
        redirect: false,
    }

    componentDidMount() {
        // Using dinamic id collected using props.match from the gerRecipesByIngredients API call function
        this.getSingleRecipe(this.props.match.params.id);
    }

    // Getting single recipe
    getSingleRecipe = (id) => {
        console.log("getSingleRecipe", id);
        axios
            .get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            )
            .then((res) => {
                console.log(res);
                this.setState({
                    selectedRecipe: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // post recipes and seving them to faves page
    postRecipe = () => {
        const recipeId = this.state.selectedRecipe.id;
        const recipeTitle = this.state.selectedRecipe.title;
        const recipeImage = this.state.selectedRecipe.image;
        console.log(this.state.selectedRecipe.id);
        // Post fave recipe to server
        axios
            .post(`${process.env.REACT_APP_API_URL}/recipes`, {
                id: recipeId,
                title: recipeTitle,
                image: recipeImage,
            })
            .then((res) => {
                console.log(res)
                console.log('"your recipe has been added to Faves"')
                this.setState({ redirect: true })
            })
            .catch((err) => console.log(err));
    }




    render() {

        const { redirect, selectedRecipe } = this.state;

        if (redirect) {
            return <Redirect to="/faves" />
        }
        return (
            <>
                <div className='recipe__nav'>
                </div>
                <header className='recipe__header'>
                    <div className='recipe__title'>
                        <h1 className='recipe__title-text'>{selectedRecipe.title}</h1>
                    </div>
                    <div className='recipe__container'>
                        <div className='recipe__info'>
                            <div className='recipe__info-box'>
                                <img className='recipe__info-icon' src={Servings} alt='meal plate' />
                                <h4 className='recipe__info-text'>{selectedRecipe.servings} Servings</h4>
                            </div>
                            <div className='recipe__info-box'>
                                <img className='recipe__info-icon' src={Time} alt='clock' />
                                <h4 className='recipe__info-text'>Ready in {selectedRecipe.readyInMinutes} min.</h4>
                            </div>
                        </div>
                        <div className='recipe__img-section'>
                            <div className="recipe__img-overlay"></div>
                            <img className='recipe__img-photo' src={selectedRecipe.image} alt={selectedRecipe.title} />
                        </div>
                    </div>
                </header>
                <main className='main__container'>
                    <div className='main__container-section'>
                        <p className='main__container-text'>{parse(`${selectedRecipe.summary}`)}</p>
                        <div className='main__container-list--ing'>
                            <h3 className='main__container-title'>Ingredients</h3>
                            {/* Collecting ingreadients from objects inside and array */}
                            <ul className='main__container-items'>
                                {selectedRecipe.extendedIngredients &&
                                    selectedRecipe.extendedIngredients.map(
                                        (ingredient) => <li className='main__container-item' key={ingredient.id}>{ingredient.original}</li>)}

                            </ul>
                        </div>
                    </div>
                    <div className='main__container-list--stps'>
                        <h3 className='main__container-title main__container-title--steps'>Steps</h3>
                        {/* Collecting steps instruction from objects inside and array */}
                        <ol className='main__container-steps'>
                            {selectedRecipe.analyzedInstructions &&
                                selectedRecipe.analyzedInstructions[0].steps.map(
                                    (step) => <li className='main__container-step' key={step.number}>{step.step}</li>)}

                        </ol>
                    </div>
                    <button className='main__container-btn' onClick={this.postRecipe}>Add Favourites</button>
                    <Link className='link' to="/">
                        <p className='link__back'>Back to Home Page</p>
                    </Link>
                </main>
            </>
        );
    }
}

