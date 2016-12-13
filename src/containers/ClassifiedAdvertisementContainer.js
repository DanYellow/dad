import { connect } from 'react-redux'


import { classifiedAdvertisementUpdated } from '../actions'
import ClassifiedAdvertisementContainer from '../components/ClassifiedAdvertisementContainer'

function mapStateToProps(state) {
  return {
    isCAUpdated: state.app.isCAUpdated,
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
