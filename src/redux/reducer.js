
const initialState = {
  responses:[],
  selectedType: 'All',
}

const reducer =  (state = initialState,  action) => {
  switch (action.type) {
    case 'GET_URL':
      return {...state, responses: [...state.responses, action.payload]}
    case 'CHANGE_SELECTED_TYPE':
      return {...state, selectedType: action.payload}
    default:
      return state
  }
}

export default reducer

