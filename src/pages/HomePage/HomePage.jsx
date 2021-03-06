import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCards from "../../components/RecipeCards/RecipeCards";
import Calendar from "../../assets/images/icons/calendar.svg";
import Clock from "../../assets/images/icons/clock.svg";
import Trash from "../../assets/images/icons/trashcan.svg";
import { TabTitle } from '../../utils/GeneralFunctions';

const apiKey= process.env.REACT_APP_API_KEY;

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
  // Had to turn this function into a arrow function in order to work.
  callApi = (num) => {
    // Taking the values from the ingredient inputs and number of recipes selected to be saved in session storage.
    sessionStorage.setItem('number', num)
    sessionStorage.setItem('ing1', this.state.ingredient1)
    sessionStorage.setItem('ing2', this.state.ingredient2)
    sessionStorage.setItem('ing3', this.state.ingredient3)
    sessionStorage.setItem('ing4', this.state.ingredient4)
    sessionStorage.setItem('ing5', this.state.ingredient5)

    console.log(this.state.ingredient1)
    this.setState({ number: num })
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

  // Collecting form data.
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Using DidMount to set session storage.
  componentDidMount() {
    const savedNum = sessionStorage.getItem('number');
    const savedIng1 = sessionStorage.getItem('ing1');
    const savedIng2 = sessionStorage.getItem('ing2');
    const savedIng3 = sessionStorage.getItem('ing3');
    const savedIng4 = sessionStorage.getItem('ing4');
    const savedIng5 = sessionStorage.getItem('ing5');
    // I number is not null, do this.
    if (savedNum !== null) {
      this.setState({
        ingredient1: savedIng1,
        ingredient2: savedIng2,
        ingredient3: savedIng3,
        ingredient4: savedIng4,
        ingredient5: savedIng5,
      },
        () => {
          this.callApi(savedNum)
        }
      )
    }
  }

  render() {
    const { recipesByIngredients,  } = this.state;
    TabTitle('Simple Meal');

    return (
      <div>
        <header className="header">
          <div className="header__main">
            <div className="header__content">
              <h1 className="header__content-title">A simple meal plan</h1>
              <p className="header__content-text">Save time planning your meals and reduce food waste</p>
              <Link className="header__content-link" to="/about">
                <p className="header__content-btn">Learn More</p>
              </Link>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="main__content">
            <div className="main__content-card">
              <img className="main__content-icon" src={Calendar} alt="calendar" />
              <p className="main__content-info">Create a weekly meal plan to help you stay organized</p>
            </div>
            <div className="main__content-card">
              <img className="main__content-icon" src={Clock} alt="clock" />
              <p className="main__content-info">Save time grocery shopping</p>
            </div>
            <div className="main__content-card">
              <img className="main__content-icon" src={Trash} alt="trash can" />
              <p className="main__content-info">Reduce food waste by using the same ingredients in different recipes</p>
            </div>
          </div> 
          <form className="main__box">
            <section className="main__box-section main__box-section--left">
              <p className="main__box-title">
                Add the ingredients you would like to use in your recipes
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

            <section className="main__box-section main__box-section--left">
              <p className="main__box-title">
                Select the number of recipes you would like to display
              </p>
              <div className="main__box-container">
                <div className="main__box-container-sub main__box-container-sub-top">
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(1)}>1</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(2)}>2</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(3)}>3</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(4)}>4</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(5)}>5</button>
                </div>
                <div className="main__box-container-sub main__box-container-sub-bottom">
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(6)}>6</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(7)}>7</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(8)}>8</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(9)}>9</button>
                  <button className="main__box-container-nums" type="button" onClick={() => this.callApi(10)}>10</button>
                </div>
              </div>
            </section>
          </form>
          <div className="main__card">
            {recipesByIngredients && recipesByIngredients
              .map(dataRecipeCard => (
                <Link className="main__card-link" to={`/recipe/${dataRecipeCard.id}`} key={dataRecipeCard.id}>
                  <RecipeCards recipe={dataRecipeCard} />
                </Link>
              ))}
          </div>

        </main>
      </div>
    );
  }
}


