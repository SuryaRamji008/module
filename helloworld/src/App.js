
import './App.css';
import Home from './components/Home';
import {Switch,Route,Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Books from './components/Books';
import Login from './components/Login'
import BookForm from './components/BookForm'
import Cart from './components/Cart';
import CustomBooks from './components/CustomBooks';
import Search from './components/Search';
import Tinkle from './components/Books/Tinkle';
import Jungle from './components/Books/Jungle';
import Notfound from './components/Notfound';

function App() {

  const islogin = useSelector(state => state.custom.Login )

  return (
    <div>
     <header className = "header">
     <Switch>
     <Route path = '/' exact>
        <Redirect to= '/Login'/>
      </Route>
     {!islogin && <Route path = '/Login' exact>
        <Login/>
      </Route>}
      {islogin && <Route path = '/Home' exact>
        <Home/>
      </Route>}
      {islogin && <Route path = '/Cart' exact>
        <Cart/>
      </Route>}
      <Route path = '/iasBooks' exact>
        <Books/>
      </Route>
      <Route path = '/BookForm' exact>
        <BookForm/>
      </Route>
      <Route path = '/CustomBooks' exact>
        <CustomBooks/>
      </Route>
      <Route path = '/Search' exact>
        <Search/>
      </Route>
       <Route path = '/Search/Jungle' exact>
        <Jungle/>
      </Route>
      <Route path = '/Search/Tinkle' exact>
        <Tinkle/>
      </Route>
      <Route path = '*' exact>
        <Notfound/>
      </Route> 
     </Switch>
     </header>
  </div>
  );
}

export default App;
