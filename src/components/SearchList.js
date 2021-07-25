import { ImgItem } from  './ImgItem';
import { useDispatch } from 'react-redux';
import { addPhotos, incSearchPage, changePhoto, addInitialPageSearch } from '../actions';
import { getSearchImgs } from '../api';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import {useParams } from 'react-router-dom';

export const SearchList = (data) => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { photoList, searchPage, justVisitedPhoto, searchReady } = data.state;
    const [error, setError] = useState('');
    
    useEffect(()=> {    
        if (!searchReady) {   
            getSearchImgs(query, 1)
            .then((photoList)=>{  
                if (photoList.total === 0) {
                    setError('Sorry, no matching images were found.')
                } else {
                    dispatch(incSearchPage(1));
                    dispatch(addPhotos(photoList.results));
                    dispatch(incSearchPage());
                    dispatch(addInitialPageSearch(true));
                }
            })
            .catch(e => {
                setError('Sorry, something went wrong, please try again later.');
                console.log(e);
            });
        }
    }, [query]);

    useEffect(() => {
        photoList.forEach(function(item, i) {
            if (item.id === justVisitedPhoto.id) photoList[i] = justVisitedPhoto 
        });
        dispatch(changePhoto(photoList))
    }, [justVisitedPhoto])

    const addPage = ()=> {
        getSearchImgs(query, searchPage)
        .then((photoList)=>{
            dispatch(incSearchPage());
            dispatch(addPhotos(photoList.results));
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <>
        {query !== '' ? <h3>Searching for: '{query}'</h3> : '' }
        {error ? (<h4><br/>{error}</h4>) : (
            <InfiniteScroll
                dataLength={photoList.length} 
                next={addPage}
                hasMore={true}
                loader={
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                >
                <div>
                    <div className='images' > 
                        {photoList.map(item=>
                            <ImgItem key={item.id} item={item}/>
                        )}
                    </div>
                </div>
            </InfiniteScroll>
        )}
        </>
    )
}
