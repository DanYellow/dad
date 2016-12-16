import * as ActionTypes from '../constants/ActionTypes'

export const closePopin = function () {
  return {
    type: ActionTypes.CLOSE_POPIN
  }
}

export const classifiedAdvertisementUpdated = (data) => {
  return {
    type: ActionTypes.CA_UPDATED,
    data
  }
}

