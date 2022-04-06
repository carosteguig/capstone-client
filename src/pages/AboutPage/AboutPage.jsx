import './AboutPage.scss';
import { TabTitle } from '../../utils/GeneralFunctions';
import { Link } from 'react-router-dom';

export default function AboutPage() {

    TabTitle('About- Simple Meal');

    return (
        <>
        <header className="header-about">
              <h1 className="header-about__title">About</h1>
        </header>


        </>
    );
}