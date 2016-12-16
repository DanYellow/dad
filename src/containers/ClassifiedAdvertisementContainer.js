import { connect } from 'react-redux'
import _ from 'lodash'

import { classifiedAdvertisementUpdated } from '../actions'
import ClassifiedAdvertisementContainer from '../components/ClassifiedAdvertisementContainer'

function mapStateToProps(state) {
  return {
    isCAUpdated: !_.isEmpty(state.app.updatedCADatas),
    updatedCADatas: state.app.updatedCADatas,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    classifiedAdvertisementUpdated
  }
}


var ClassifiedAdvertisementContainerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps()
)(ClassifiedAdvertisementContainer)

export default ClassifiedAdvertisementContainerWrapper
