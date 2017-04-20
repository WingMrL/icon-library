import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const iconLibraryApp = combineReducers({
  todos,
  visibilityFilter
})

export default iconLibraryApp;
