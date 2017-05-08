export default (actions, initialState) => (state = initialState, action) => {
  if (!actions[action.type]) {
    return state;
  }
  return actions[action.type](state, action);
};
