import { colorSpaceConstants } from "../constants";
// import { nanoid } from 'nanoid';
export const colorSpaceActions = {
  updateColorSpace,
};

function updateColorSpace(entry, key) {
  return dispatch => {
  dispatch({ 
    type: colorSpaceConstants.EDIT_COLOR_SPACE, 
    key,
    entry 
  });
  }
}