import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import PokemonCreate from './components/PokemonCreate';
import Detail from './components/Detail';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/pokemonCreate' component={PokemonCreate}/>
          <Route exact path='/detail/:id' component={Detail}/>
          <Route/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
