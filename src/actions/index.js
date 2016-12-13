import * as ActionTypes from '../constants/ActionTypes'

export const closePopin = function () {
  return {
    type: ActionTypes.CLOSE_POPIN
  }
}

export const classifiedAdvertisementUpdated = function (value, newDatas) {
  return {
    type: ActionTypes.CA_UPDATED,
    value,
    datas: newDatas
  }
}

