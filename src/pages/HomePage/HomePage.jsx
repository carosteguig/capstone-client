import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { RecipeCards } from "../../components/RecipeCards/RecipeCards";

export default class HomePage extends Component {
  state = {
    recipesByIngredients: [],
    selectedRecipe: {},
  };

  componentDidMount() {
    this.getRecipesByIngredients();
  }

  getRecipesByIngredients() {
    axios
      .get(
        "https://api.spoonacular.com/recipes/findByIngredients?apiKey=75770683cc6b418c8d40e409a13a5de2&ingredients=eggs,+bacon,+avocado&number=3"
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

  render() {
    return (
      <div>
        <h1>Spoonacular test</h1>
        <header className="header">
          <div className="header__left-box">
            <h1 className="header__title">Simplify your life</h1>
            <Link to="">
              <p className="header__btn">Learn More</p>
            </Link>
          </div>
          <img src="" alt="photo of plate" />
        </header>
        <main className="main">
          <section className="main__box main__box--left">
            <p className="main__box-title">
              Add the ingredients you want in your recipe/s
            </p>
            <input
              className="main__box-input"
              type="text"
              name="ingredient1"
              placeholder="Add ingredient..."
            />
            <input
              className="main__box-input"
              type="text"
              name="ingredient2"
              placeholder="Add ingredient..."
            />
            <input
              className="main__box-input"
              type="text"
              name="ingredient3"
              placeholder="Add ingredient..."
            />
            <input
              className="main__box-input"
              type="text"
              name="ingredient4"
              placeholder="Add ingredient..."
            />
            <input
              className="main__box-input"
              type="text"
              name="ingredient5"
              placeholder="Add ingredient..."
            />
          </section>
          <section className="main__box main__box--left">
            <p className="main__box-title">
              Select the number of recipe/s you want to display
            </p>
            <button className="main__box">1</button>
            <button className="main__box">2</button>
            <button className="main__box">3</button>
            <button className="main__box">4</button>
            <button className="main__box">5</button>
            <button className="main__box">6</button>
            <button className="main__box">7</button>
          </section>
          <div>
            {/* <RecipeCards 
                title={}
              /> */}
            <ul>
              {this.state.recipesByIngredients.map((dataRecipe) => (
                <Link to={`/recipe/${dataRecipe.id}`}>
                  <li key={dataRecipe.id}>
                    <img src={dataRecipe.image} alt={dataRecipe.title} />
                    <div>
                      <h3>{dataRecipe.title}</h3>
                      <div>
                        <p>Likes:</p>
                        <p>{dataRecipe.likes}</p>
                      </div>
                      <div>
                        <p>N. of Ingredients</p>
                        <p>{dataRecipe.usedIngredientCount}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}
