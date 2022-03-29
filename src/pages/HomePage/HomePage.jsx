import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import RecipePage from "../RecipePage/RecipePage";
import RecipeCards from "../../components/RecipeCards/RecipeCards";

const apiKey = "75770683cc6b418c8d40e409a13a5de2";
// const apiKey2 = "68bf58bbf64a42ed81a11aad8a2f4547";

export default class HomePage extends Component {
  state = {
    recipesByIngredients: [],
    selectedRecipe: {},
    //     // ingredient1: '',
    //     // ingredient2: '',
    //     // ingredient3: '',
    //     // ingredient4: '',
    //     // ingredient5: '',
  };

  //Mounting
  componentDidMount() {
    this.getRecipesByIngredients();
  }

  //this runs many times!
  componentDidUpdate(prevProps, prevState) {
    // console.log('component did update');

    if (this.props.match.params.id) {
      console.log(this.props.match.params.id);
      if (prevProps.match.params.id !== this.props.match.params.id) {
        this.getSingleRecipe(this.props.match.params.id);
      }
      // }
    }
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

  //Getting the recipes from the ingredients added
  getRecipesByIngredients() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=avocado,+peppers,+cheese&number=3`
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

  // handleIngredients = event => {
  //   this.setState ({
  //       [[event.target.name]: event.target.value,

  //   })
  // }

  render() {
    console.log(this.props);
    console.log(this.state.recipesByIngredients);
    console.log(this.props.match.params);
    console.log(this.state.selectedRecipe);

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
              <h2>{this.state.selectedRecipe.title}</h2>
              <p>{this.state.selectedRecipe.servings}</p>
              <p>{this.state.selectedRecipe.summary}</p>
              <p>
                {this.state.selectedRecipe.extendedIngredients &&
                this.state.selectedRecipe.extendedIngredients.map(
                  (ingredient) => ingredient.name)}
              </p>
            </div>

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


 {/* <RecipePage
              image={this.state.selectedRecipe.image}
              title={this.state.selectedRecipe.title}
              servings={this.state.selectedRecipe.servings}
              summary={this.state.selectedRecipe.summary}
              ingredients={
                this.state.selectedRecipe.extendedIngredients &&
                this.state.selectedRecipe.extendedIngredients.map(
                  (ingredient) => ingredient.name
                )
              }
            /> */}
            //  <div>
            //   <h2>{this.state.selectedRecipe.title}</h2>
            //   <p>{this.state.selectedRecipe.servings}</p>
            //   <p>
            //     {this.state.selectedRecipe.extendedIngredients &&
            //     this.state.selectedRecipe.extendedIngredients.map(
            //       (ingredient) => ingredient.name)}
            //   </p>
            // </div> 

            {/* let recipeIngredients = this.state.selectedRecipe.extendedIngredients.map(ingredient => 
                ingredient.name) 
              ) */}
            {/* <ul>
              {this.state.recipesByIngredients.map((dataRecipe) => (
                <Link to={`/recipe/${dataRecipe.id}`} key={dataRecipe.id}>
                  <li>
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
            </ul> */}