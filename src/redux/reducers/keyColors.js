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
    // case keyColorConstants.ADD_BULK_COLOR:
    //   return {
    //     ...state,
    //     keyColors: {
    //       ...state.Keycolors,
    //       [action.entryId]: entry(state[action.entryId], action),
    //     },
    //   };
    //   break;
    case keyColorConstants.CLEAR_COLOR_ITEM:
      const result = {
        ...state,
        keyColors: {
          ...state.keyColors,
        },
      };
      delete result.keyColors[action.entryId];
      return result;
      break
    case keyColorConstants.CLEAR_COLOR_LIST:
      return [action.entry];
      break
    default:
      return state;
      break;
  }
}