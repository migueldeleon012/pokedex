import axios from 'axios'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import Bar from './style/Bar.style'


function Pokemon(props){
  const dispatch = useDispatch()
  const [pokemonSpecies, setPokemonSpecies] = useState(null)
  const [pokemon, setPokemon] = useState(null)
  const index = props.match.params

  const onButtonClickHandler = (e) =>{
    dispatch({type: 'CHANGE_SELECTED_TYPE', payload: e.target.textContent})
  }

  useEffect( ()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index.id}`)
    .then( res => setPokemonSpecies(res.data))
  },[])
  
  useEffect( ()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${index.id}`)
    .then( res => setPokemon(res.data))
  },[])

  if (!pokemonSpecies || !pokemon) return <h1 className="loader">Loading...</h1>

  return (
    <>
      <div className="container">
        <div className="container__card"  key={pokemon.id}>
          <div className="container__card__header">
            {pokemon.id < 10 ? (<p>{pokemon.name} #00{pokemon.id}</p>)
              : (pokemon.id >= 10 && pokemon.id < 100) ? (<p>{pokemon.name} #0{pokemon.id}</p>)
              : (<p>{pokemon.name} #{pokemon.id}</p>)
            }
          </div>
          
          <div className="container__card__body">
            <Link to="/" className="go-back">Go back</Link>
            <div className="pokemon-img">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-types">
              {pokemon.types.map( type =>
                <Link to='/'><button className={type.type.name} onClick={e => onButtonClickHandler(e)}>{type.type.name}</button></Link>
              )}
            </div>

            <p className="flavor-text">{pokemonSpecies.flavor_text_entries[0].flavor_text}</p>

            <div className="stats">
              <h3>Stats:</h3>
              <p>HP:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[0].base_stat}>
                  <p>{pokemon.stats[0].base_stat}</p>
                </Bar>
              </div>
              <p>Attack:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[1].base_stat}>
                  <p>{pokemon.stats[1].base_stat}</p>
                </Bar>
              </div>
              <p>Defense:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[2].base_stat}>
                  <p>{pokemon.stats[2].base_stat}</p>
                </Bar>
              </div>
              <p>Sp Atk:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[3].base_stat}>
                  <p>{pokemon.stats[3].base_stat}</p>
                </Bar>
              </div>
              <p>Sp Def:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[4].base_stat}>
                  <p>{pokemon.stats[4].base_stat}</p>
                </Bar>
              </div>
              <p>Speed:</p>
              <div className="stats__stat">
                <Bar amount={pokemon.stats[5].base_stat}>
                  <p>{pokemon.stats[5].base_stat}</p>
                </Bar>
              </div>
            </div>
            <div className="description">
              <h3>More about {pokemon.name}:</h3>
              <div className="description__detail">
                <p>Weight:</p>
                <p>{pokemon.weight} lbs</p>
              </div>
              <div className="description__detail">
                <p>Height:</p>
                <p>{pokemon.height} in</p>
              </div>
              <div className="description__detail">
                <p>Main Ability:</p>
                <p>{pokemon.abilities[0].ability.name}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pokemon


