/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 03-07-2017
 * |
 * | File Name:     index.js
 * +===============================================
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './components/App'
import About from './components/About'

ReactDOM.render((
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/about' component={About} />
    </div>
  </Router>
), document.getElementById('root'))
