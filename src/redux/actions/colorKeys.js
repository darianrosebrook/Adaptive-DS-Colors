import { colorKeyConstants } from "../constants";
export const colorKeyActions = {
  addNewColor,
  updateColor,
  addBulkColor,
  addFromCode,
  clearcolorKeys,
  clearColorItem,
};

function addNewColor(entry) {
  return dispatch => {
  dispatch({ 
    type: colorKeyConstants.NEW_COLOR, 
    entry 
  });
  }
}
function updateColor(entry, key) {
  return dispatch => {
  dispatch({ 
    type: colorKeyConstants.EDIT_COLOR, 
    key,
    entry 
  });
  }
}
function addBulkColor(entry) {
  return { 
    type: colorKeyConstants.ADD_BULK_COLOR, 
    entry 
  };
}
function addFromCode(entry) {
  return { 
    type: colorKeyConstants.ADD_CODE_COLOR, 
    entry 
  };
}
function clearcolorKeys(entry) {
  return { 
    type: colorKeyConstants.CLEAR_COLOR_LIST, 
    entry 
  };
}
function clearColorItem(entry, key) {
  return { 
    type: colorKeyConstants.CLEAR_COLOR_ITEM, 
    key, 
    entry 
  };
}