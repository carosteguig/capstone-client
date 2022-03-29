import './RecipePage.scss';
import { Component } from "react";
import axios from 'axios';

const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class RecipePage extends Component {

    state = {
        selectedRecipe: {},
    }

    componentDidMount() {
        this.getRecipesByIngredients();
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
                    <h4>{this.state.selectedRecipe.servings}</h4>
                    <p>{this.state.selectedRecipe.summary}</p>
                    <ul>
                        <li>
                            {this.state.selectedRecipe.extendedIngredients &&
                                this.state.selectedRecipe.extendedIngredients.map(
                                    (ingredient) => ingredient.name)}
                        </li>
                    </ul>

                </main>
            </>
        );
    }
}

