import './Navigation.scss';
import { NavLink } from 'react-router-dom'

export default function Navigation() {

    return (
        <nav className='nav'>
            <NavLink to='/'>
                <img className='nav__logo' src="" alt="recipe logo" />
            </NavLink>
            <div>
                <NavLink to='/'>
                    <p>Faves</p>
                </NavLink>
                <NavLink to='/'>
                    <p>About</p>
                </NavLink>

            </div>
        </nav>

    );
}