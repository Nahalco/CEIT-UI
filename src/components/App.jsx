import React from 'react'

import Header from './Header'
import Dashboard from './Dashboard'

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css'

// styles
import '../styles/main.less'
import '../styles/nav.less'
import '../styles/frame.less'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    )
  }
}

export default App
