import './RecipePage.scss';

export default function Recipe(props) {

    return (
        <>
            <section>
                <img src={props.image} alt={props.title} />
                <div>
                    <h1>{props.title}</h1>
                    <div>
                       <p>{props.summary}</p> 
                    </div>
                </div>
            </section>

        </>
    );
}