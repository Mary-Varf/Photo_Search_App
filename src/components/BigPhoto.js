import {useEffect, useState} from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { getPhotoById, unsplash } from '../api';
import {Preloader} from '../layout/Preloader';
import { toJson } from 'unsplash-js';
import { addBigPhoto, incLikes, decLikes, visitedPhoto} from '../actions';

import {useDispatch} from 'react-redux';

export const  BigPhoto = ({bigPhoto, likedID}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [fullPic, setFullPic] = useState('');
    const [authLink, setAuthLink] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [authName, setAuthName] = useState('');
    const {alt_description, likes } = bigPhoto;

    useEffect(() => {
        getPhotoById(id).then((bigPhoto)=> {
            dispatch(addBigPhoto(bigPhoto));
            setFullPic(bigPhoto.urls.full);
            setAuthLink(bigPhoto.user.links.html);
            setAuthName(bigPhoto.user.username);
            setCreateDate(bigPhoto.created_at.slice(0,10));
            let justVisitedPhoto = bigPhoto;
            dispatch(visitedPhoto(justVisitedPhoto));
        })
        }, [id]);
        
    let justVisitedPhoto = bigPhoto;

    const {goBack} = useHistory();

    const access_token = sessionStorage.getItem("token");

    const errorAction = (errors) => {
        console.log('error occurred: ' + errors[0]);
        const errorMessage = ('Unfortunately, some error occurred, your action is not complete' );
        const errorDiv=document.querySelector('.error');
        errorDiv.innerHTML = errorMessage;
        justVisitedPhoto.likes = bigPhoto.likes;
        dispatch(visitedPhoto(justVisitedPhoto));
    }

    const postLike = () => {
        unsplash.auth.setBearerToken(access_token);
        unsplash.photos.likePhoto(id)
        .then(toJson)
        .then(json => {
            if (json.errors) {
                errorAction(json.errors);
            } else {
                console.log(json)
                if (json.photo.likes !== bigPhoto.likes + 1) {
                    postDislike()
                    likeBtn.innerHTML = 'favorite_border';
                    if (likeIcon) {
                        likeIcon.classList.remove('.l-show');
                        likeIcon.classList.add('.d-l-show');
                    }
                } else {
                    dispatch(incLikes(bigPhoto.likes, id));
                    justVisitedPhoto.likes = bigPhoto.likes + 1;
                    dispatch(visitedPhoto(justVisitedPhoto));
                }
            }
        });
    }

    const postDislike = () => {
        unsplash.auth.setBearerToken(access_token);
        unsplash.photos.unlikePhoto(id)
        .then(toJson)
        .then(json => {
            if (json.errors) {
                errorAction(json.errors);
            } else {
                dispatch(decLikes( bigPhoto.likes, id));
                justVisitedPhoto.likes = bigPhoto.likes - 1;
                dispatch(visitedPhoto(justVisitedPhoto));
            }
        });
     }

    const likeBtn = document.querySelector('#like');
    const likeIcon = document.querySelector('.like_icon');
    
    const postAction = () => {   
        if (localStorage.likedID.includes(id)) {
            postDislike(id);
            likeBtn.innerHTML = 'favorite_border';
            if (likeIcon) {
                likeIcon.classList.remove('.l-show');
                likeIcon.classList.add('.d-l-show');
            }
        } else {
            postLike(id);
            likeBtn.innerHTML = 'favorite';
        }
    } 
    return (
        <>
            <div onClick={goBack} className="btn-floating  waves-effect waves-light red go-back-btn">
                <i className="material-icons">arrow_back</i>
            </div>
            <div>
                <div className="card-image big-card-image">
                    {!fullPic.length? <Preloader/> : <a href={fullPic} title={fullPic}>
                    <img src={fullPic} alt={alt_description} />
                    </a>}
                    <div onClick={postAction} className="btn-floating  waves-effect waves-light red btn-like"><i id='like'  className="material-icons">favorite_border</i></div>
                </div>
                <div className="card-content">
                    <div className="card-title">
                        <div className='error red-text'></div>
                        <p>Created by <a href={authLink} target="_blank" rel="noreferrer noopener" title={authLink}>{authName} on Unsplash</a></p>
                    </div>
                    <p>Likes: {likes} 
                    {localStorage.likedID.includes(id)?<span id='likes' className='red-text like_icon l-show'>&#10084;</span>:null}
                     </p> 
                    <p>Created at: {createDate} </p>
                </div>
            </div>
        </>

    )
}