import { authentification } from '../api';

export const Home = () => {
    if (!localStorage.likedID){localStorage.setItem('likedID', null)};
    authentification();
   //  window.location.assign('/Main');
}

