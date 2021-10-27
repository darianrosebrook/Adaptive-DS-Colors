import { contrastRatioConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const contrastRatioActions = {
  addNewStop,
  updateStop,
  // addBulkStop,
  addFromCode,
  clearinputRatios,
  clearStopItem,
  updateRatios
};

function addNewStop(entry) {
  return dispatch => {
  dispatch({ 
    type: contrastRatioConstants.ADD_NEW_RATIO, 
    // entryId: nanoid(),
    entry 
  });
  }
}
function updateStop(entry, key) {
  return dispatch => {
  dispatch({ 
    type: contrastRatioConstants.EDIT_RATIO, 
    key,
    entry 
  });
  }
}
function updateRatios(entry, key) {
  return dispatch => {
  dispatch({ 
    type: contrastRatioConstants.UPDATE_RATIOS, 
    entry 
  });
  }
}
// function addBulkStop(entry) {
//   return { 
//     type: contrastRatioConstants.BULK, 
//     entry 
//   };
// }
function addFromCode(entry) {
  return { 
    type: contrastRatioConstants.CODE, 
    entry 
  };
}
function clearinputRatios(entry) {
  return { 
    type: contrastRatioConstants.CLEAR_RATIO_LIST, 
    entry 
  };
}
function clearStopItem(entry, key) {
  return { 
    type: contrastRatioConstants.CLEAR_RATIO_ITEM, 
    key, 
    entry 
  };
}