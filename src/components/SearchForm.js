import { searchImg } from '../actions';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SearchForm = () => {
    const [ searchVal, setSearchVal ] = useState('');
    const searchLine = '/main?query=' + searchVal.searchVal;
    const dispatch = useDispatch();
    return (
        <div className="search" id='inputSearch'>
            <div className="search-wrapper">
                <input 
                    type='text'
                    id="search"
                    placeholder="Search"
                    onChange={e => setSearchVal({searchVal: e.target.value})}
                    onKeyUp={e=> {
                        if (e.keyCode === 13) {
                            dispatch(searchImg(searchVal.searchVal));
                    }}}
                    onBlur={e => e.target.value = ''}
                />
                <Link to={searchLine}>
                    <i className="material-icons cursor" 
                        onClick={() => {
                        console.log(searchVal.searchVal)
                            if (searchVal !== '') {
                                dispatch(searchImg(searchVal.searchVal));
                            }
                        }} >search
                    </i>  
                </Link>             
                <div className="search-results"></div>
            </div>
        </div>
    )
}
