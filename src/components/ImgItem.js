import { Link } from 'react-router-dom';

export const ImgItem = (data) =>{
    const {id, created_at, alt_description, likes, urls, user } = data.item;
    
    const date = created_at.slice(0,10);
    return (
        <div className="card"> 
            <div className="card-image">
                <Link to={`/BigPhotoMain/BigPhoto/${id}`}>
                    <img src={urls.small} alt={alt_description} />
                </Link>
            </div>
            <div className="card-content">
              <div className="card-title">
              <img className="author-img" src={user.profile_image.small} alt=""/>
                  <a href={user.links.html} target="_blank" rel='noreferrer'>{user.username}</a>
                </div>
              <p>Likes: {likes}</p>
              <p>Created: {date}</p>
            </div>
            
        </div>
    );
}

