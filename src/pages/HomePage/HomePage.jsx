import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import RecipePage from "../RecipePage/RecipePage";
import RecipeCards from "../../components/RecipeCards/RecipeCards";

const apiKey = "75770683cc6b418c8d40e409a13a5de2";
// const apiKey2 = "68bf58bbf64a42ed81a11aad8a2f4547";
// const parse = require('html-react-parser');

export default class HomePage extends Component {
  state = {
    recipesByIngredients: [],
    selectedRecipe: {},
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    ingredient4: '',
    ingredient5: '',
  };

  //Mounting
  componentDidMount() {
    this.getRecipesByIngredients();
  }


  //Getting the recipes from the ingredients added
  getRecipesByIngredients() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=eggs,${this.state.ingredient1},+${this.state.ingredient2},
        +${this.state.ingredient3},+${this.state.ingredient4},+${this.state.ingredient5}&number=4`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          recipesByIngredients: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  callApi



  render() {
    // console.log(this.props);
    // console.log(this.state.recipesByIngredients);
    // console.log(this.props.match.params);
    // console.log(this.state.selectedRecipe);

    // const parse = require('html-react-parser');

    return (
      <div>
        <header className="header">
          <div className="header__left-box">
            <h1 className="header__title">Simplify your life by quickly selecting recipes</h1>
            <Link to="">
              <p className="header__btn">Learn More</p>
            </Link>
          </div>
          <img src="" alt="food on a plate" />
        </header>
        <main className="main">
          <form>
            <section className="main__box main__box--left">
              <p className="main__box-title">
                Add the ingredients you want in your recipe/s
              </p>
              <input
                className="main__box-input"
                type="text"
                name="ingredient1"
                placeholder="Add ingredient..."
                onChange={this.handleChange}
              />
              <input
                className="main__box-input"
                type="text"
                name="ingredient2"
                placeholder="Add ingredient..."
                onChange={this.handleChange}
              />
              <input
                className="main__box-input"
                type="text"
                name="ingredient3"
                placeholder="Add ingredient..."
                onChange={this.handleChange}
              />
              <input
                className="main__box-input"
                type="text"
                name="ingredient4"
                placeholder="Add ingredient..."
                onChange={this.handleChange}
              />
              <input
                className="main__box-input"
                type="text"
                name="ingredient5"
                placeholder="Add ingredient..."
                onChange={this.handleChange}
              />

            </section>
            <section className="main__box main__box--left">
              <p className="main__box-title">
                Select the number of recipe/s you want to display
              </p>
              {/* <button className="main__box" type="button" onClick={callApi}>1</button>
              <button className="main__box" type="button" onClick={callApi}>2</button>
              <button className="main__box" type="button" onClick={callApi}>3</button>
              <button className="main__box" type="button" onClick={callApi}>4</button>
              <button className="main__box" type="button" onClick={callApi}>5</button>
              <button className="main__box" type="button" onClick={callApi}>6</button>
              <button className="main__box" type="button" onClick={callApi}>7</button> */}
           
              <button className="main__box" type="button">1</button>
              <button className="main__box" type="button">2</button>
              <button className="main__box" type="button">3</button>
              <button className="main__box" type="button">4</button>
              <button className="main__box" type="button">5</button>
              <button className="main__box" type="button">6</button>
              <button className="main__box" type="button">7</button>
            </section>
          </form>
          <div>
            <div>
              {this.state.recipesByIngredients && this.state.recipesByIngredients
                .map(dataRecipeCard => (
                  <Link to={`/recipe/${dataRecipeCard.id}`} key={dataRecipeCard.id}> {/** I tried adding {this.props.match.params.id} to the route but didn't work*/}
                    <RecipeCards recipe={dataRecipeCard} />
                  </Link>
                ))}
            </div>
          </div>

        </main>
      </div>
    );
  }
}


