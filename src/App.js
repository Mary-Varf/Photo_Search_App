import { Route, Switch } from 'react-router-dom';
import { Header} from './layout/Header';
import { Footer} from './layout/Footer';
import Main from './page/Main';
import { Home } from './page/Home';
import BigPhotoMain from './page/BigPhotoMain';
import Search from './page/Search'
import { About } from './page/About';
import { NotFound } from './page/NotFound';

import './index.css';

const App = () => {
    return <>
        <Header />
        <main className="container content">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={About}/>
                <Route path="/BigPhotoMain/BigPhoto/:id" component={BigPhotoMain}/>
                <Route path="/Search/SearchList/:query" component={Search}/>
                <Route component={NotFound}/>
            </Switch>
        </main>
        <Footer />
    </>
}

export default App;