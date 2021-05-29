import {colorRampConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = {
  colorTheme: 'Neutral',
  colorResults: [
    {stop: 100, contrast: 1, color: '#FFFFFF'}
  ],
}


export const colorRamp = (state = initialState, action) => {
  switch (action.type) {
    case colorRampConstants.UPDATE_COLOR_RAMP:
      let newArray = [];
      for(let i = 0; i < action.entry.length; i++) {
        newArray.push({stop: 100, contrast: 1, color: action.entry[i]})
      }
      return {...state, colorResults: newArray}
      break;
    default:
      return state;
      break;
  }
}