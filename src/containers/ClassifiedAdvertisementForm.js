import { connect } from 'react-redux'
import _ from 'lodash'


import { classifiedAdvertisementUpdated } from '../actions'
import ClassifiedAdvertisementForm from '../components/ClassifiedAdvertisementContainer/ClassifiedAdvertisementFormContainer'

function mapStateToProps(state) {
  return {
    isCAUpdated: !_.isEmpty(state.app.updatedCADatas),
    // isCAUpdated: state.app.isCAUpdated,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    classifiedAdvertisementUpdated
  }
}


var ClassifiedAdvertisementFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps()
)(ClassifiedAdvertisementForm)

export default ClassifiedAdvertisementFormContainer
