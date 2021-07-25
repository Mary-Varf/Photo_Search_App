import Unsplash from 'unsplash-js';

export const unsplash = new Unsplash({
    applicationId: 'nK0MVSY1oJWReIAjtEloARCiki6HBCBhYjeIsSQpG1E',
    secret: '_9jN-OJhakhdlJtGmZiLzZMqGIQilcmpP8Vg26Xd8i4',
    callbackUrl: 'http://localhost:3000/main',
    // applicationId: 'pxeBRqYL6hfgv0exWRY7rY9t_cDXcRjMYGnnVxE8Uzs',
    // secret: 'MNW1yI1m4nvyWLa_q459kzuCb55FMDV8ErzVO1v2SSU',
    // callbackUrl: 'https://iiwebdev.mcdir.ru/main',
});

export const authentification = () => {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
            "public",
            "write_likes"
        ]);
    window.location.assign(authenticationUrl);
}

export const getPhotoList = (search = '', page) => {
    if (search === '') {
        return unsplash.photos
            .listPhotos(page)
            .then(response=> response.json())
    } else{
        return unsplash.search.photos(search, page)
            .then(response=> response.json())
    }
}
export const getPhotoById = async (id) => {
    return unsplash.photos
        .getPhoto(id)
        .then(response=> response.json())
};

const code = window.location.search.split('code=')[1];
if (code) {
    unsplash.auth
    .userAuthentication(code)
    .then(res => res.json())
    .then(json => {
        sessionStorage.setItem("token", json.access_token);
        const access_token = sessionStorage.getItem("token");
        unsplash.auth.setBearerToken(access_token);
    });
}
