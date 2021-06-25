import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Host from './Host'
import Guest from './Guest'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/host' component={Host} />
        <Route path='/guest' component={Guest} />
        <Redirect from='*' to='/guest' />
      </Switch>
    </Router>
  )
}

export default App
