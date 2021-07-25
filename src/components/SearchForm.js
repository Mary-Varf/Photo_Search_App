import { addInitialPageSearch } from '../actions';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const SearchForm = () => {
    const [ searchVal, setSearchVal ] = useState('');
    const searchLine = '/Search/SearchList/' + searchVal.searchVal;
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
                            dispatch(addInitialPageSearch(true));
                            window.location.assign(searchLine)
                    }}}
                    onBlur={e => e.target.value = ''}
                />
                    <i className="material-icons cursor" 
                        onClick={() => {
                            if (searchVal !== '') {
                                dispatch(addInitialPageSearch(true));
                                window.location.assign(searchLine)
                            }
                        }} >search
                    </i>           
                <div className="search-results"></div>
            </div>
        </div>
    )
}
