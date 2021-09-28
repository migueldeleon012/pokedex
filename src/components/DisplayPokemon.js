import { useSelector, useDispatch } from 'react-redux'
import IndividualPokemon from './IndividualPokemon'

function DisplayPokemon({inputValue}) {
  const responses = useSelector( state => state.responses)
  const selectedType = useSelector( state => state.selectedType)
  const dispatch = useDispatch()

  const types = [
    "All",
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Steel",
    "Fairy",]

  const onChangeClickHandler = (e) =>{
    dispatch({type: 'CHANGE_SELECTED_TYPE', payload: e.target.value})
  }

  return (
    <>
      <select defaultValue='' onChange= { e => onChangeClickHandler(e) }>
        <option value="" disabled>Select Type</option>
        {types.map( type => <option value={type} key={type}>{type}</option>)}
      </select>
      <div className="container">
      {
        responses
          // sort pokemon by id
          .sort((a, b) => a.id > b.id && 1 || -1)
          .filter( pokemon => selectedType === "All" || selectedType === undefined
            ? pokemon
            : pokemon.types[0].type.name === selectedType.toLowerCase() 
            ? pokemon 
            : pokemon.types[1] !== undefined 
            ? pokemon.types[0].type.name === selectedType.toLowerCase() || pokemon.types[1].type.name === selectedType.toLowerCase() 
            : null
          )
          .filter(
            pokemon => pokemon.name.includes(inputValue)
          )
          .map( pokemon => 
            <IndividualPokemon
              pokemon={pokemon}
            />
          )
      }
      </div>
    </>
  )
}

export default DisplayPokemon
