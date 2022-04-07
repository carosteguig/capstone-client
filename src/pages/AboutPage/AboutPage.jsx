import './AboutPage.scss';
import { TabTitle } from '../../utils/GeneralFunctions';
// import { Link } from 'react-router-dom';

export default function AboutPage() {

    TabTitle('About- Simple Meal');

    return (
        <>
        <header className="header-about">
            <div className="header-about__container">
              <h1 className="header-about__title">About</h1>
            </div>
        </header>
        <main className='header-main'>
            <div className='header-main__container'>
                <p className='header-main__text'>
                    Simple Meal was created with the intention to help people to simplify their meal planning and grocery shopping ritual. The idea was to create a very easy-to-use app that will provide recipes depending on what ingredients the user wants to eat or buy.
                </p>
                <p className='header-main__text'>
                    Yes, the goal is to simplify grocery shopping but also is to reduce food waste. Using the same ingredients in different meals during the week should help to use the majority of the produce before it expires, HENCE, save money.
               </p>
                <p className='header-main__text'>
                    Simple Meal allows people to select up to 5 ingredients and up to 10 recipes. By combining different ingredients, there is a great selection of recipes for vegetarians, vegans and meat-eaters!
                </p>
                <p className='header-main__text--green'>
                    If you don't need a meal plan, but don’t know what to cook tonight, or you are going grocery shopping tomorrow and there is not much left in your fridge, Simple Meal can save you time as well! Just add a few ingredients and select a few recipes!
                </p>
            </div>
            {/* <div>
                <p className='header-main__text--green'>
                    If you don't need a meal plan, but don’t know what to cook tonight, or you are going grocery shopping tomorrow and there is not much left in your fridge, Simple Meal can save you time as well! Just add a few ingredients and select a few recipes!
                </p>
            </div> */}

        </main>


        </>
    );
}