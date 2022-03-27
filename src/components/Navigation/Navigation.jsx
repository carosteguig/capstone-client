import './Navigation.scss';
import { Link } from 'react-router-dom'

export default function Navigation() {

    return (
        <nav className='nav'>
            <Link to='/' exact>
                <img className='nav__logo' src="" alt="recipe logo" />
            </Link>
            <div>
                <Link to=''>
                    <p>Faves</p>
                </Link>
                <Link to=''>
                    <p>About</p>
                </Link>

            </div>
        </nav>

    );
}