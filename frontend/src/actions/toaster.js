export const SetToast = toast => ({
  type: 'SET_TOAST',
  toast,
});

export const DismissToast = () => ({
  type: 'DISMISS_TOAST',
});

export const ClearToast = () => ({
  type: 'CLEAR_TOAST',
});
