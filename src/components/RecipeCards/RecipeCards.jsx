import './RecipeCards.scss';

export default function RecipeCards(props) {

  const { recipe } = props;

  return (

    <div className="card">
      <ul className="card__container">
        <li className="card__content" key={recipe.id}>
          <div className="card__figure">
            <div className="card__overlay"></div>
            <img className="card__image" src={recipe.image} alt={recipe.title} />
          </div>
          <div className="card__header">
            <h3 className="card__title">{recipe.title}</h3>
          </div>
        </li>
      </ul>
    </div>

  );
}