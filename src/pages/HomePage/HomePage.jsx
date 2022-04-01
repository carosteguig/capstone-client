import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCards from "../../components/RecipeCards/RecipeCards";

// API key
const apiKey = "75770683cc6b418c8d40e409a13a5de2";

export default class HomePage extends Component {

  // Setting state for recipes info and form inputs
  state = {
    recipesByIngredients: [],
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    ingredient4: '',
    ingredient5: '',
  };

 
  // Calling the API using dinamic even.target.value data on the API url.
  // Had to turn this function into a arrow function in order to work
  callApi = (num) => {
    console.log(this.state.ingredient1)
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${this.state.ingredient1},+${this.state.ingredient2},
        +${this.state.ingredient3},+${this.state.ingredient4},+${this.state.ingredient5}&number=${num}`
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

  // Collecting form data
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

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
                // passing form data
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
              <button className="main__box" type="button" onClick={() => this.callApi(1)}>1</button>
              <button className="main__box" type="button" onClick={() => this.callApi(2)}>2</button>
              <button className="main__box" type="button" onClick={() => this.callApi(3)}>3</button>
              <button className="main__box" type="button" onClick={() => this.callApi(4)}>4</button>
              <button className="main__box" type="button" onClick={() => this.callApi(5)}>5</button>
              <button className="main__box" type="button" onClick={() => this.callApi(6)}>6</button>
              <button className="main__box" type="button" onClick={() => this.callApi(7)}>7</button>
              <button className="main__box" type="button" onClick={() => this.callApi(8)}>8</button>
              <button className="main__box" type="button" onClick={() => this.callApi(9)}>9</button>
              <button className="main__box" type="button" onClick={() => this.callApi(10)}>10</button>
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


