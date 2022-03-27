import './NotFound.scss';
import { Link } from 'react-router-dom';

function NotFound () {
    return (
        <div className='notFound'>
        <h1 className='notFound__title'>4<span className='notFound__title--color'>0</span>4</h1>
        <h2 className='notFound__text'>oops- the page can't be found</h2>
        <Link to='/'>
            <button className='notFound__button' type='submit'>go to home page</button>
        </Link>
        </div>

    );
}

export default NotFound;