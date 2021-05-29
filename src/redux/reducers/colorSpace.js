import {colorSpaceConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = 'CAM02';

export const colorSpace = (state = initialState, action) => {
  switch (action.type) {
    case colorSpaceConstants.EDIT_COLOR_SPACE:
      return action.entry;
      break;
    default:
      return state;
      break;
  }
}