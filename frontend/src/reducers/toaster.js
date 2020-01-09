import * as R from 'ramda';

const initialState = {
  text: "It's me! Toast!",
  type: 'success',
  show: false,
  isOnRight: false,
};

const SetToast = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.show = true;
  const mergedState = R.mergeDeepRight(stateClone, action.toast);
  return mergedState;
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'SET_TOAST': return SetToast(state, action);
    case 'DISMISS_TOAST': return R.assoc('show', false, state);
    case 'CLEAR_TOAST': return Object.assign({}, initialState);
    default:
      return state;
  }
}
