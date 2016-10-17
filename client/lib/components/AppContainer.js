import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from './App'

const mapStateToProps = state => ({
  message: "hi"
})

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
