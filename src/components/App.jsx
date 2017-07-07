import React from 'react'

import Header from './Header'
import Dashboard from './Dashboard'
import Sidebar from 'react-sidebar'

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css'

// styles
import '../styles/main.less'
import '../styles/nav.less'
import '../styles/frame.less'

class App extends React.Component {
  render () {
    return (
      <Sidebar
        styles={{
          sidebar: {
            background: 'rgba(0,0,0,0.6)'
          }
        }}
        sidebar={
          <ul className='nav nav-pills flex-column'>
            <li className='nav-item'>
              <a className='nav-link text-white bg-warning' href='#'>Home</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-warning' href='#'>Alarms</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-warning' href='#'>About</a>
            </li>
          </ul>
        }
        docked
      >
        <Header />
        <Dashboard />
      </Sidebar>
    )
  }
}

export default App
