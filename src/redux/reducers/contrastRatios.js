import {contrastRatioConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = [1.00]

export const contrastStops = (state = initialState, action) => {
  switch (action.type) {
    case contrastRatioConstants.ADD_NEW_RATIO:
      return [...state, action.entry ]
      break;
    case contrastRatioConstants.EDIT_RATIO:
      let newArray = [...state];
      newArray[action.key] = action.entry;
      return newArray;
      break;
    case contrastRatioConstants.UPDATE_RATIOS:
      return action.entry;
      break;
    case contrastRatioConstants.CLEAR_RATIO_ITEM:
      state.splice(action.key, 1);
      return [...state]
      break
    case contrastRatioConstants.CLEAR_RATIO_LIST:
      return [action.entry];
      break
    default:
      return state;
      break;
  }
}