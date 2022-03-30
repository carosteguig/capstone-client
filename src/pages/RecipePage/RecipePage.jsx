import './RecipePage.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";

// API key
const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class RecipePage extends Component {

    // Setting state for single recipe
    state = {
        selectedRecipe: {},
    }

    componentDidMount() {
        // Using dinamic id collected using props.match from the gerRecipesByIngredients API call function
        this.getSingleRecipe(this.props.match.params.id);
    }

    // Getting single recipe
    getSingleRecipe(id) {
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


    render() {
        console.log(this.state.selectedRecipe);
        return (
            <>
                <header>
                    <img src={this.state.selectedRecipe.image} alt={this.state.selectedRecipe.title} />
                </header>
                <main>
                    <h1>{this.state.selectedRecipe.title}</h1>
                    <h4>Servings: {this.state.selectedRecipe.servings}</h4>
                    <h4>Prep time: {this.state.selectedRecipe.readyInMinutes} minutes</h4>
                    {parse(`${this.state.selectedRecipe.summary}`)}
                    <h3>Ingredients</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ul>
                            {this.state.selectedRecipe.extendedIngredients &&
                                this.state.selectedRecipe.extendedIngredients.map(
                                    (ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}

                    </ul>
                    <h3>Steps</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ol>
                        {this.state.selectedRecipe.analyzedInstructions &&
                                this.state.selectedRecipe.analyzedInstructions[0].steps.map(
                                    (step) => <li key={step.number}>{step.step}</li>)}
                    
                    </ol>
                    <button>+ Favourites</button>
                    

                </main>
            </>
        );
    }
}

