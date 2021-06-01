import {colorRampConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = {
  colorScheme: 'Neutral',
  colorResults: [{
      color: '#ffffff',
      contrastDisplay: '#000000',
      colorStop: '100',
      contrastRatio: 1
  }
  ],
}
let updateArray;


export const colorRamp = (state = initialState, action) => {
  switch (action.type) {
    case colorRampConstants.UPDATE_COLOR_RAMP:
      let results = Object.assign({}, state)
      if (action.key === null) {
        results.colorScheme = action.entry;
      } else {
      updateArray = state.colorResults;
      results.colorResults[action.key].colorStop = action.entry;
      }
      return results;
      break;
    default:
      return state;
      break;
  }
}