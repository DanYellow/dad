import { combineReducers } from 'redux'

import * as ActionTypes from '../constants/ActionTypes'

const closePopin = function (state = false, action) {
  switch (action.type) {
    case ActionTypes.LOADING_PKMN:
      return true;
    default:
      return false;
  }
}

const isCAUpdated = function (state = false, action) {
  switch (action.type) {
    case ActionTypes.CA_UPDATED:
      return action.value;
    default:
      return false;
  }
}

const updatedCADatas = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CA_UPDATED:
      return action.datas;
    default:
      return state;
  }
}


const appReducers = combineReducers({
  closePopin,
  isCAUpdated,
  updatedCADatas
});

export default appReducers
