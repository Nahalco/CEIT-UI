import React, { Component } from 'react'
import Dashboard, { addWidget } from 'react-dazzle'

// App components
import Header from './Header'
import Container from './Container'
import CustomFrame from './CustomFrame'

// Widgets of the dashboard.
import Multisensor from './widgets/Multisensor'
import Lamps from './widgets/Lamps'
import Gas from './widgets/Gas'
import Mode from './widgets/Mode'
import Cooler from './widgets/Cooler'
import Projector from './widgets/Projector'
import FireAlarm from './widgets/FireAlarm'

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
            className: 'col-3',
            widgets: []
          }, {
            className: 'col-3',
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
          lampsWidget: {
            type: Lamps,
            title: 'Lamps',
            props: {
              things: agents[0].getThingsByType('lamp')
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 1, 'lampsWidget')
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          gasWidget: {
            type: Gas,
            title: 'Gas',
            props: {
              thing: agents[0].getThingsByType('gas')[0]
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 1, 'gasWidget')
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          fireAlarmWidget: {
            type: FireAlarm,
            title: 'Fire Alarm',
            props: {
              thing: agents[0].getThingsByType('gas')[0]
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 2, 'fireAlarmWidget')
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          projectorWidget: {
            type: Projector,
            title: 'Projector',
            props: {
              thing: agents[0].getThingsByType('projector')[0]
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 1, 'projectorWidget')
      })

      this.setState({
        widgets: Object.assign(this.state.widgets, {
          coolerWidget: {
            type: Cooler,
            title: 'Cooler',
            props: {
              thing: agents[0].getThingsByType('cooler')[0]
            }
          }
        }),

        layout: addWidget(this.state.layout, 0, 1, 'coolerWidget')
      })

      for (const thing of agents[0].getThingsByType('mode')) {
        this.setState({
          widgets: Object.assign(this.state.widgets, {
            modeWidget: {
              type: Mode,
              title: 'Scenario',
              props: {
                thing: thing
              }
            }
          }),

          layout: addWidget(this.state.layout, 0, 2, 'modeWidget')
        })
      }
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
