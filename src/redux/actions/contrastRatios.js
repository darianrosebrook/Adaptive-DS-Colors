import { contrastRatioConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const contrastRatioActions = {
  addNewStop,
  updateStop,
  // addBulkStop,
  // addFromCode,
  clearContrastStops,
  clearStopItem,
};

function addNewStop(entry) {
  return dispatch => {
  dispatch({ 
    type: contrastRatioConstants.NEW, 
    // entryId: nanoid(),
    entry 
  });
  }
}
function updateStop(entry, key) {
  return dispatch => {
  dispatch({ 
    type: contrastRatioConstants.EDIT, 
    key,
    entry 
  });
  }
}
function addBulkStop(entry) {
  return { 
    type: contrastRatioConstants.BULK, 
    entry 
  };
}
function addFromCode(entry) {
  return { 
    type: contrastRatioConstants.CODE, 
    entry 
  };
}
function clearContrastStops(entry) {
  return { 
    type: contrastRatioConstants.CLEARLIST, 
    entry 
  };
}
function clearStopItem(entry) {
  return { 
    type: contrastRatioConstants.CLEARITEM, 
    entryId: entry, 
    entry 
  };
}