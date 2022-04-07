import './NotFound.scss';
import { Link } from 'react-router-dom';
import { TabTitle } from '../../utils/GeneralFunctions';

function NotFound() {

    // This creates dinamic titles for pages
    TabTitle('Not Found- Simple Meal');

    return (
        <>
            <div className='recipe__nav'>
            </div>
            <div className='notFound'>
                <h1 className='notFound__title'>4<span className='notFound__title--color'>0</span>4</h1>
                <h2 className='notFound__text'>oops- the page can't be found</h2>
                <Link to='/'>
                    <button className='notFound__button' type='submit'>go to home page</button>
                </Link>
            </div>
        </>

    );
}

export default NotFound;