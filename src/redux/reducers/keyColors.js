import {keyColorConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = ['#ffffff']

export const keyColors = (state = initialState, action) => {
  switch (action.type) {
    case keyColorConstants.NEW_COLOR:
      return [...state, action.entry ]
      break;
    case keyColorConstants.EDIT_COLOR:
      const entry = action.entry,
            key = action.key
      const newArray = [...state];
      newArray[key] = entry;
      return newArray;
      break;
    case keyColorConstants.ADD_BULK_COLOR:
      return action.entry
      break;
    case keyColorConstants.CLEAR_COLOR_ITEM:
      state.splice(action.key, 1);

      return state.length < 1 ? ['#ffffff'] : [...state];
      break
    case keyColorConstants.CLEAR_COLOR_LIST:
      return [action.entry];
      break
    default:
      return state;
      break;
  }
}