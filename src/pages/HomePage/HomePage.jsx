import './HomePage.scss';
import { Component } from 'react';
import axios from 'axios';


export default class HomePage extends Component {

    state = {
        recipesByIngredients: [],
        selectedRecipe: {}
    };

    componentDidUpdate() {
        this.getRecipesByIngredients();
    }

    getRecipesByIngredients() {
        axios
        .get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=75770683cc6b418c8d40e409a13a5de2&ingredients=eggs,+bacon,+avocado&number=3')
        .then((res) =>{
            console.log(res);
            this.setState({
                recipesByIngredients: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }



    render() {
        return (
            <div>
                <h1>Spoonacular test</h1>
                
            </div>
        );
    }
}