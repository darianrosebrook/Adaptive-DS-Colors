import {contrastRatioConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = [1.00]

export const contrastStops = (state = initialState, action) => {
  switch (action.type) {
    case contrastRatioConstants.NEW:
      return [...state, action.entry ]
      break;
    case contrastRatioConstants.EDIT:
      const entry = action.entry,
            key = action.key
      const newArray = [...state];
      newArray[key] = entry;
      return newArray;
      break;
    // case contrastRatioConstants.BULK:
    //   return {
    //     ...state,
    //     keyColors: {
    //       ...state.Keycolors,
    //       [action.entryId]: entry(state[action.entryId], action),
    //     },
    //   };
    //   break;
    case contrastRatioConstants.CLEARITEM:
      const result = {
        ...state,
        keyColors: {
          ...state.keyColors,
        },
      };
      delete result.keyColors[action.entryId];
      return result;
      break
    case contrastRatioConstants.CLEARLIST:
      return [action.entry];
      break
    default:
      return state;
      break;
  }
}