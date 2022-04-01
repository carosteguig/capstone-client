import './FavoriteRecipeItem.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";

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
    // deleteRecipe = () => {
    //     const recipeId = this.state.selectedFaveRecipe.id;
    //     console.log(this.state.selectedFaveRecipe.id);
    //     // Delete fave recipe to server
    //     axios
    //         .delete(`${process.env.REACT_APP_API_URL}/recipes/delete/${recipeId}`)
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }


    render() {
        // console.log(this.state.selectedRecipe.id);
        return (
            <>
                <header>
                    <img src={this.state.selectedFaveRecipe.image} alt={this.state.selectedFaveRecipe.title} />
                </header>
                <main>
                    <h1>{this.state.selectedFaveRecipe.title}</h1>
                    <h4>Servings: {this.state.selectedFaveRecipe.servings}</h4>
                    <h4>Prep time: {this.state.selectedFaveRecipe.readyInMinutes} minutes</h4>
                    {parse(`${this.state.selectedFaveRecipe.summary}`)}
                    <h3>Ingredients</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ul>
                        {this.state.selectedFaveRecipe.extendedIngredients &&
                            this.state.selectedFaveRecipe.extendedIngredients.map(
                                (ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}

                    </ul>
                    <h3>Steps</h3>
                    {/* Collecting steps instruction from objects inside and array */}
                    <ol>
                        {this.state.selectedFaveRecipe.analyzedInstructions &&
                            this.state.selectedFaveRecipe.analyzedInstructions[0].steps.map(
                                (step) => <li key={step.number}>{step.step}</li>)}

                    </ol>
                    <button onClick={this.deleteRecipe}>Delete</button>


                </main>
            </>
        );
    }
}