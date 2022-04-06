import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import SimpleMealLogo from '../../assets/images/logo/SimpleMeal-logo-small.png';


export default function Navigation() {

    return (
        <nav className='nav'>
            <NavLink to='/'>
                <img className='nav__logo' src={SimpleMealLogo} alt="Simple Meal logo" />
            </NavLink>
            <div className='nav__list'>
                <NavLink className='nav__list-link' to='/faves'>
                    <p className='nav__list-text'>Faves</p>
                </NavLink>
                <NavLink className='nav__list-link' to='/about'>
                    <p className='nav__list-text'>About</p>
                </NavLink>
            </div>
        </nav>

    );
}