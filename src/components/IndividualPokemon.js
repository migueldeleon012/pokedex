import {Link} from 'react-router-dom'
import {useState} from 'react'
import spinner from '../assets/img/spinner.gif'

function IndividualPokemon({pokemon}) {
  const [isLoading, setIsLoading] = useState(true)

  const loadingHandler = () =>{
    setIsLoading(false)
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
    <div className="container__card hover-up" key={pokemon.id}>
      <div className="container__card__header">
      {/* {display pokemon id with  extra '0s' if needed} */}
        {pokemon.id < 10 ? (<p>#00{pokemon.id}</p>)
          : (pokemon.id >= 10 && pokemon.id < 100) ? (<p>#0{pokemon.id}</p>)
          : (<p>#{pokemon.id}</p>)
        }
      </div>
      
      <div className="container__card__body">
        <div className="img">
          {isLoading &&
            <div class="spinner">
               <img src={spinner} alt='spinner'/>
            </div>
          }
          <img src={pokemon.sprites.front_default} alt={pokemon.name} onLoad={ loadingHandler }/>
        </div>
        <p>{pokemon.name}</p>
        <div className="types">
          {pokemon.types.map( type =>
            <button className={type.type.name}>{type.type.name}</button>
          )}
        </div>
      </div>
    </div>
  </Link>
  )
}

export default IndividualPokemon
