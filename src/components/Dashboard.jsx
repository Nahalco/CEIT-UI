import React, { Component } from 'react'
import Dashboard from 'react-dazzle'

// App components
import Header from './Header'
import Container from './Container'
import CustomFrame from './CustomFrame'

// Widgets of the dashboard.
import Multisensor from './widgets/Multisensor'

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css'

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css'

// Our styles
import '../styles/custom.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {
        MultisensorWidget: {
          type: Multisensor,
          title: 'Multisensor'
        }
      },
      // Layout of the dashboard
      layout: {
        rows: [{
          columns: [{
            className: 'col-12',
            widgets: [{key: 'MultisensorWidget'}]
          }]
        }]
      }
    }
  }

  render () {
    return (
      <Container>
        <Header />
        <Dashboard
          frameComponent={CustomFrame}
          layout={this.state.layout}
          widgets={this.state.widgets}
          editable={false}
        />
      </Container>
    )
  }
}

export default App
