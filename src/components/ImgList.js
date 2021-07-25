import {ImgItem} from  './ImgItem';
import {useDispatch} from 'react-redux';
import {addPhotos, incPage, addInitialPage, changePhoto} from '../actions';
import {getPhotoList} from '../api';
import {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ImgList = (data) => {
    const {photoList, page, appReady, justVisitedPhoto} = data.state;
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    useEffect(()=> {      
        if (!appReady) {
            getPhotoList(1).then((photoList)=>{  
                dispatch(addPhotos(photoList));
                dispatch(addInitialPage(true));
            }).catch(e=>{
                setError(true);
                console.log(e);
            });
        }           
    }, [appReady]);

    useEffect(() => {
        photoList.forEach(function(item, i) {
            if (item.id === justVisitedPhoto.id) photoList[i] = justVisitedPhoto });
        dispatch(changePhoto(photoList))
    }, [justVisitedPhoto])


    const addPage = ()=> {
        getPhotoList(page).then((photoList)=>{
            dispatch(incPage());
            dispatch(addPhotos(photoList));
        })
    }

    return (
        <>
         {error?(<h4>Sorry, something went wrong, please try again later.</h4>):(
            <InfiniteScroll
                dataLength={photoList.length} 
                next={addPage}
                hasMore={true}
                loader={<div className="progress">
                    <div className="indeterminate"></div>
                </div>}
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



