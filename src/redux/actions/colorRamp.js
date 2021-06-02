import { colorRampConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const colorRampActions = {
  updateColorRamp,
  addColorStop,
  clearColorStops,
  clearColorStopItem
};

function updateColorRamp(entry, key) {
  return dispatch => {
  dispatch({ 
    type: colorRampConstants.UPDATE_COLOR_RAMP, 
    entry,
    key
  });
  }
}
function addColorStop(entry, key) {
  return dispatch => {
  dispatch({ 
    type: colorRampConstants.ADD_COLOR_STOP, 
    entry,
    key
  });
  }
}
function clearColorStops(entry) {
  return { 
    type: colorRampConstants.CLEAR_STOPS_LIST,
    entry 
  };
}
function clearColorStopItem(entry, key) {
  return { 
    type: colorRampConstants.CLEAR_STOP_ITEM,
    key, 
    entry 
  };
}