export const ADD_SIZE_SELECTION = 'ADD_SIZE_SELECTION'
export const ADD_TOPPING_SELECTION = 'ADD_TOPPING_SELECTION'
export const REMOVE_TOPPING_SELECTION = 'REMOVE_TOPPING_SELECTION'
export const ADD_POP_SELECTION = 'ADD_POP_SELECTION'
export const MINUS_POP_SELECTION = 'MINUS_POP_SELECTION'
export const SPECIAL_SELECTION = 'SPECIAL_SELECTION'

export function addSizeSelection(data) {
  return {
    type: ADD_SIZE_SELECTION,
    payload: data
  };
}

export function addToppingSelection(data) {
  return {
    type: ADD_TOPPING_SELECTION,
    payload: data
  };
}

export function removeToppingSelection(data) {
  return {
    type: REMOVE_TOPPING_SELECTION,
    payload: data
  };
}

export function addPopSelection(data) {
  return {
    type: ADD_POP_SELECTION,
    payload: data
  };
}

export function minusPopSelection(data) {
  return {
    type: MINUS_POP_SELECTION,
    payload: data
  };
}
export function specialPopSelection(data) {
  return {
    type: SPECIAL_SELECTION,
    payload: data
  };
}
