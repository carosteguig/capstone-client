import './RecipePage.scss';
import { Component } from "react";
import axios from 'axios';
import parse from "html-react-parser";

const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class RecipePage extends Component {

    state = {
        selectedRecipe: {},
    }

    componentDidMount() {
        this.getSingleRecipe(this.props.match.params.id);
    }

    // // Getting single recipe
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
                    <p>Servings:</p>
                    <h4>{this.state.selectedRecipe.servings}</h4>
                    <p>Minutes to cook:</p>
                    <h4>{this.state.selectedRecipe.readyInMinutes}</h4>
                    {parse(`${this.state.selectedRecipe.summary}`)}
                    <h3>Ingredients</h3>
                    <ul>
                            {this.state.selectedRecipe.extendedIngredients &&
                                this.state.selectedRecipe.extendedIngredients.map(
                                    (ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}

                    </ul>
                    <h3>Steps</h3>
                    <ol>
                        {this.state.selectedRecipe.analyzedInstructions &&
                                this.state.selectedRecipe.analyzedInstructions[0].steps.map(
                                    (step) => <li key={step.number}>{step.step}</li>)}
                    
                    </ol>

                </main>
            </>
        );
    }
}

