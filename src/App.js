import './assets/scss/main.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import DisplayPokemon from './components/DisplayPokemon';
import Pokemon from './components/Pokemon';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const dispatch = useDispatch() 

  useEffect( () =>{
    let id = 650
    for(let i = 1 ; i < id; i++ ){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then( res => { 
          dispatch({type: 'GET_URL', payload:res.data})
      })
    }
  }, [])

  const [name, setName] = useState('')

  const onChangeInputHandler = (e) =>{
    setName(e.target.value)
  }

  return (
    <div className="App">
        <nav>
          <p>Gen 5 National Dex</p>
          <input 
            type="text" 
            value={name} 
            onChange={e => onChangeInputHandler(e) }
            placeholder="Search Pokemon"
          />
        </nav>
      <Router>
        <Switch>
          <Route exact path ='/'>
            <DisplayPokemon
              inputValue ={name}
            />
          </Route>
          <Route path = '/pokemon/:id' component={Pokemon}/>
        </Switch>
      </Router>

      <footer>
        <p>© Miguel de Leon</p>
        <p>Photos and information provided by <a href="https://pokeapi.co/" target="_blank">Poke API</a></p>
      </footer>

    </div>
  );
}

export default App;
