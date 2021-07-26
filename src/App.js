import { Route, Switch } from 'react-router-dom';
import { Header} from './layout/Header';
import { Footer} from './layout/Footer';
import Main from './page/Main';
import { Home } from './page/Home';
import BigPhotoMain from './page/BigPhotoMain';
import Search from './page/Search'
import { About } from './page/About';
import { NotFound } from './page/NotFound';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const App = () => {
    return <>
        <BrowserRouter basename='/'>
        <Header />
        <main className="container content">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/main" component={Main}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/BigPhotoMain/BigPhoto/:id" component={BigPhotoMain}/>
                <Route exact path="/Search/SearchList/:query" component={Search}/>
                <Route component={NotFound}/>
            </Switch>
        </main>
        <Footer />
        </BrowserRouter>
    </>
}

export default App;
