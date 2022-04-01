// import 'RecipeCards.scss';

export default function RecipeCards(props) {
  console.log(props);
  return (

    <div>
      <ul>
        {/* {props && props.map((dataRecipe) => ( */}
        <li key={props.recipe.id}>
          <div>
            <img src={props.recipe.image} alt={props.recipe.title} />
          </div>
          <div>
            <h3>{props.recipe.title}</h3>
          </div>
        </li>
        {/* ))} */}
      </ul>
    </div>

  );
}