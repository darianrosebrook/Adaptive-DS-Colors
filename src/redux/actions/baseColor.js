import { baseColorConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const baseColorActions = {
  updateColor,
  addBulkColor,
  addFromCode,
};

function updateColor(entry, key) {
  return dispatch => {
  dispatch({ 
    type: baseColorConstants.EDIT_BASE_COLOR, 
    key,
    entry 
  });
  }
}
function addBulkColor(entry) {
  return { 
    type: baseColorConstants.ADD_BULK_BASE_COLOR, 
    entry 
  };
}
function addFromCode(entry) {
  return { 
    type: baseColorConstants.ADD_CODE_BASE_COLOR, 
    entry 
  };
}