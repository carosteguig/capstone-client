// import 'RecipeCards.scss';

export default function RecipeCards(props) {
console.log(props);
    return (

        <div>
        <ul>
          {/* {props && props.map((dataRecipe) => ( */}
            <li key={props.recipe.id}>
              <img src={props.recipe.image} alt={props.recipe.title} />
              <div>
                <h3>{props.recipe.title}</h3>
                <div>
                <p>Likes:</p>
                <p>{props.recipe.likes}</p>
                </div>
                <div>
                {/* <p>N. of Ingredients</p>
                <p>{props.recipe.usedIngredientCount}</p> */}
                </div>
              </div>
            </li>
          {/* ))} */}
        </ul>
      </div> 

    );
}