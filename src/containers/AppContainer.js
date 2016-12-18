import { connect } from 'react-redux'
import _ from 'lodash'

// import { classifiedAdvertisementUpdated } from '../actions'
import App from '../components/App'

function mapStateToProps(state) {
  return {
    aPopinIsOpened: true,
  }
}

var AppContainer = connect(
  mapStateToProps,
  null
)(App)

export default AppContainer
