import { keyColorConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const keyColorActions = {
  addNewColor,
  updateColor,
  addBulkColor,
  addFromCode,
  clearKeyColors,
  clearColorItem,
};

function addNewColor(entry) {
  return dispatch => {
  dispatch({ 
    type: keyColorConstants.NEW_COLOR, 
    // entryId: nanoid(),
    entry 
  });
  }
}
function updateColor(entry, key) {
  return dispatch => {
  dispatch({ 
    type: keyColorConstants.EDIT_COLOR, 
    key,
    entry 
  });
  }
}
function addBulkColor(entry) {
  return { 
    type: keyColorConstants.ADD_BULK_COLOR, 
    entry 
  };
}
function addFromCode(entry) {
  return { 
    type: keyColorConstants.ADD_CODE_COLOR, 
    entry 
  };
}
function clearKeyColors(entry) {
  return { 
    type: keyColorConstants.CLEAR_COLOR_LIST, 
    entry 
  };
}
function clearColorItem(entry) {
  return { 
    type: keyColorConstants.CLEAR_COLOR_ITEM, 
    entryId: entry, 
    entry 
  };
}