import React, { Component } from 'react'
import Dashboard, { addWidget } from 'react-dazzle'

// App components
import Header from './Header'
import Container from './Container'
import CustomFrame from './CustomFrame'

// Widgets of the dashboard.
import Multisensor from './widgets/Multisensor'
import Lamp from './widgets/Lamp'

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css'

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css'

// Our styles
import '../styles/custom.css'

// I1820
import {I1820Client} from '@i1820/api'

class App extends Component {
  constructor (props) {
    super(props)
    this.client = new I1820Client('http://iot.ceit.aut.ac.ir:58902', true)

    this.state = {
      // are we connected to I1820 ?
      loading: true,

      // Widgets that are available in the dashboard
      widgets: {},

      // Layout of the dashboard
      layout: {
        rows: [{
          columns: [{
            className: 'col-6',
            widgets: []
          }, {
            className: 'col-6',
            widgets: []
          }]
        }]
      }
    }
  }

  componentDidMount () {
    this.client.discovery().then((agents) => {
      this.setState({
        loading: false
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          multisensorWidget: {
            type: Multisensor,
            title: 'Multisensor',
            props: {
              thing: agents[0].getThingsByType('multisensor')[0]
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 0, 'multisensorWidget')
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          lampWidget: {
            type: Lamp,
            title: 'Lamp',
            props: {
              things: agents[0].getThingsByType('lamp')
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 1, 'lampWidget')
      })
    })
  }

  render () {
    if (this.state.loading) {
      return <Container />
    }

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
