import { combineReducers } from 'redux';
import SelectionReducer from './reducers';

const rootReducer = combineReducers({
  selections: SelectionReducer
});

export default rootReducer;
