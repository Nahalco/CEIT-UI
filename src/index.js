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
import {HashRouter, Route} from 'react-router-dom'
import App from './components/App'
import About from './components/About'

ReactDOM.render((
  <HashRouter>
    <Route path='/' component={App} />
    <Route path='/about' component={About} />
  </HashRouter>
), document.getElementById('root'))
