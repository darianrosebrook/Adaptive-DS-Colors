import {colorRampConstants} from '../constants';
import {createSelector } from 'reselect';

const initialState = {
  colorScheme: 'Neutral',
  colors: [{
      color: '#ffffff',
      contrastDisplay: '#000000',
      ratio: 1
  }
  ],
  colorStops: ['100'],
}
let updateArray;


export const colorRamp = (state = initialState, action) => {
  let newColorRamp;
  let newArray = [...state.colorStops];
  switch (action.type) {
    case colorRampConstants.UPDATE_COLOR_RAMP:
      if (action.key === null) {
        newColorRamp = {...state, colorScheme: action.entry}
      } else {
      newArray[action.key] = action.entry
      newColorRamp = {...state, colorStops: newArray};
      }
      return newColorRamp;
      break;
    case colorRampConstants.BULK_COLOR_RAMP:
      newColorRamp = {...state, colorStops: action.colorStops, colorScheme: action.colorScheme}
      return newColorRamp;
      break
    case colorRampConstants.ADD_COLOR_STOP:
      newArray[action.entry - 1] = action.entry * 100;
      newColorRamp = {...state, colorStops: newArray};
      return newColorRamp;
      break;
    case colorRampConstants.CLEAR_STOP_ITEM:
      newArray.splice(action.key, 1);
      newColorRamp = {...state, colorStops: newArray};
      return newColorRamp;
      break
    case colorRampConstants.CLEAR_STOPS_LIST:
      newColorRamp = {...state, colorStops: ['100']};
      return newColorRamp;
      break
    default:
      return state;
      break;
  }
}