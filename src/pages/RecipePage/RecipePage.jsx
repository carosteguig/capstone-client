import './RecipePage.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";
import { Redirect } from 'react-router-dom';

// API key
const apiKey = "75770683cc6b418c8d40e409a13a5de2";

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
            .post(`${process.env.REACT_APP_API_URL}/recipes` /*not sure if this is correct*/, {
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
        // console.log(this.state.selectedRecipe.id);
        if (this.state.redirect) {
            return <Redirect to="/faves" />
        }
        return (
            <>
                <div className='recipe__nav'>
                </div>
                <div className='recipe__container'>
                    <h1 className='recipe__title'>{this.state.selectedRecipe.title}</h1>
                    <div className='recipe__info'>
                        <h4 className='recipe__servings'>Servings: {this.state.selectedRecipe.servings}</h4>
                        <h4 className='recipe__time'>Ready in: {this.state.selectedRecipe.readyInMinutes} min.</h4>
                    </div>
                </div>
                <header className='recipe__header'>
                    <div className="recipe__header-overlay"></div>
                    <img className='recipe__header-img' src={this.state.selectedRecipe.image} alt={this.state.selectedRecipe.title} />
                </header>
                <main className='main__container'>
                    <p className='main__container-text'>{parse(`${this.state.selectedRecipe.summary}`)}</p>
                    <div className='main__container-list--ing'>
                        <h3 className='main__container-title'>Ingredients</h3>
                        {/* Collecting ingreadients from objects inside and array */}
                        <ul className='main__container-items'>
                            {this.state.selectedRecipe.extendedIngredients &&
                                this.state.selectedRecipe.extendedIngredients.map(
                                    (ingredient) => <li className='main__container-item' key={ingredient.id}>{ingredient.original}</li>)}

                        </ul>
                    </div>
                    <div className='main__container-list--stps'>
                        <h3 className='main__container-title'>Steps</h3>
                        {/* Collecting steps instruction from objects inside and array */}
                        <ol className='main__container-steps'>
                            {this.state.selectedRecipe.analyzedInstructions &&
                                this.state.selectedRecipe.analyzedInstructions[0].steps.map(
                                    (step) => <li className='main__container-step' key={step.number}>{step.step}</li>)}

                        </ol>
                    </div>
                    <button className='main__container-btn' onClick={this.postRecipe}/*{() => postRecipe()}*/>+ Favourites</button>
                </main>
            </>
        );
    }
}

