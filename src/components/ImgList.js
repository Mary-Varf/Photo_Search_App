import { ImgItem } from  './ImgItem';
import { useDispatch } from 'react-redux';
import { addPhotos, incPage, addInitialPage, changePhoto } from '../actions';
import { getPhotoList, getSearchImgs } from '../api';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchImg } from '../actions';
import React from 'react';

export const ImgList = (data) => {
    const dispatch = useDispatch();
    const { photoList, page, appReady, justVisitedPhoto, search } = data.state;
    const [error, setError] = useState(false);

    useEffect(()=> {    
        
        if (window.location.search.length > 8 && window.location.search.length < 30 ) {
            getPhotoList(window.location.search.slice(7), 1)
            .then((photoList)=>{  
                console.log(photoList.results);
                dispatch(addPhotos(photoList.results));
                dispatch(incPage());
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            if (!appReady) {
                getPhotoList('', 1)
                .then((photoList)=>{  
                    console.log(photoList);
                    dispatch(addPhotos(photoList));
                    dispatch(incPage());
                    dispatch(addInitialPage(true));
                })
                .catch(e => {
                    console.log(e);
                });
            }
        }
    }, [appReady]);
    
    // useEffect(()=> {    
        
    //     if (appReady && window.location.search.length > 8 && window.location.search.length < 30 ) {
    //         getPhotoList(window.location.search.slice(7), 1)
    //         .then((photoList)=>{  
    //             console.log(photoList.results);
    //             dispatch(addPhotos(photoList.results));
    //             dispatch(incPage());
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    //     }
    // }, [search]);

console.log('SEARCH ' + search)
    useEffect(() => {
        photoList.forEach(function(item, i) 
            {if (item.id === justVisitedPhoto.id) 
                photoList[i] = justVisitedPhoto 
            });
            dispatch(changePhoto(photoList))
    }, [justVisitedPhoto])

    const addPage = ()=> {
        if (search === '') {
            getPhotoList(search, page)
            .then((photoList)=>{
                dispatch(incPage());
                dispatch(addPhotos(photoList));
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            getPhotoList(search, page)
            .then((photoList)=>{
                dispatch(incPage());
                dispatch(addPhotos(photoList.results));
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <>
        {search !== '' ? <h3>Searching for {search}</h3> : '' }
        {error ? (<h4>Sorry, something went wrong, please try again later.</h4>) : (
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
