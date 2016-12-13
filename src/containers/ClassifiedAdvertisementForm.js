import { connect } from 'react-redux'


import { classifiedAdvertisementUpdated } from '../actions'
import ClassifiedAdvertisementForm from '../components/ClassifiedAdvertisementContainer/ClassifiedAdvertisementFormContainer'

function mapStateToProps(state) {
  return {
    isCAUpdated: state.app.isCAUpdated,
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
