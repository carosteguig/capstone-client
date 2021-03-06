import './Recipes.scss';
import { Component } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Redirect } from 'react-router-dom';

const apiKey= process.env.REACT_APP_API_KEY;

export default class Recipes extends Component {

    // Setting state for single recipe
    state = {
        selectedRecipe: {},
        redirect: false,
    }

    getSingleRecipe = (id) => {
        console.log("getSingleRecipe", id);
        axios
            .get(
                `https://api.spoonacular.com/recipes/660126/information?apiKey=${apiKey}`
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

        const { redirect, selectedRecipe  } = this.state;

        // console.log(this.state.selectedRecipe.id);
        if (redirect) {
            return <Redirect to="/faves" />
        }


        return (
            <>
                <header>
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                </header>
                <main>
                    <h1>{selectedRecipe.title}</h1>
                    <h4>Servings: {selectedRecipe.servings}</h4>
                    <h4>Prep time: {selectedRecipe.readyInMinutes} minutes</h4>
                    {parse(`${selectedRecipe.summary}`)}
                    <h3>Ingredients</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ul>
                        {selectedRecipe.extendedIngredients &&
                            selectedRecipe.extendedIngredients.map(
                                (ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}

                    </ul>
                    <h3>Steps</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ol>
                        {selectedRecipe.analyzedInstructions &&
                            selectedRecipe.analyzedInstructions[0].steps.map(
                                (step) => <li key={step.number}>{step.step}</li>)}

                    </ol>
                    <button onClick={this.postRecipe}>+ Favourites</button>


                </main>

            </>

        );
    }
} 