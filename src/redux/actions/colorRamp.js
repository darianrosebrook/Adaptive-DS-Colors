import { colorRampConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const colorRampActions = {
  updateColorRamp,
};

function updateColorRamp(entry, key) {
  return dispatch => {
  dispatch({ 
    type: colorRampConstants.UPDATE_COLOR_RAMP, 
    entry 
  });
  }
}