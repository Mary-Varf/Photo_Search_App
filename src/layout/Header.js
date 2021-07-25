import { Link } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';
import { searchImg, addInitialPage } from '../actions';
import React from 'react'
import { useDispatch } from 'react-redux';

export const Header = () => {
    const dispatch = useDispatch();
    return (
      <header>
        <nav className='#546e7a blue-grey darken-1'>
            <div className="nav-wrapper">
                <div onClick={() => {dispatch(searchImg('')); dispatch(addInitialPage(false));}}>
                    <Link to='/main' className="brand-logo left cursor">Photo App</Link>
                </div>
                <ul  className="right">
                    <li className="search">
                        <SearchForm />
                    </li>
                    <li>
                        <Link to='/about' className='cursor' id='mob-dn'>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
      </header>
    )
}


