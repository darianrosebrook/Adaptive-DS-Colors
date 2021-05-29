import {baseColorConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = '#ffffff';

export const baseColor = (state = initialState, action) => {
  switch (action.type) {
    case baseColorConstants.EDIT_BASE_COLOR:
      return action.entry;
      break;
    default:
      return state;
      break;
  }
}