import { ADD_SIZE_SELECTION, ADD_TOPPING_SELECTION, ADD_POP_SELECTION, MINUS_POP_SELECTION, REMOVE_TOPPING_SELECTION, SPECIAL_SELECTION} from '../actions/index'
const initialState = {
  sizes: {},
  toppings: [],
  pops: {}
}
export default function(state = initialState, action){
  switch (action.type) {
    case ADD_SIZE_SELECTION:
      return Object.assign({}, state, {
        sizes: action.payload
      })
    case ADD_TOPPING_SELECTION:
      const topping = action.payload
      return Object.assign({}, state, {
        toppings: [
          ...state.toppings,
          topping
        ]
      })
    case REMOVE_TOPPING_SELECTION:
      return Object.assign({}, state, {
        toppings: Object.values(state.toppings).filter(topping => topping.id !== action.payload.id)
      })

    case ADD_POP_SELECTION:
      const id = action.payload.id
      return Object.assign({}, state, {
        pops: {
          ...state.pops,
          [id]: {
            ...action.payload,
            quantity: state.pops[id] && state.pops[id].quantity !== undefined ? state.pops[id].quantity + 1 : 1
          }
        }
      })
    case MINUS_POP_SELECTION:
      const minusId = action.payload.id
      return Object.assign({}, state, {
        pops: {
          ...state.pops,
          [minusId]: {
            ...action.payload,
            quantity: state.pops[minusId] && state.pops[minusId].quantity !== undefined && state.pops[minusId].quantity > 0 ? state.pops[minusId].quantity - 1 : 0
            //if state.pops[id] and state.pops[id].quantity then quantity++ else return 0
          }
        }
      })
      case SPECIAL_SELECTION:
        const randomPop = action.payload.id
        return Object.assign({}, state, {
          pops: {
            [1]: {
              ...action.payload,
              quantity: 1
              //if state.pops[id] and state.pops[id].quantity then quantity++ else return 0
            }
          }
        })
  }
  return state;
}
