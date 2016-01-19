import React from 'react'
import CircularJSON from 'circular-json'

export default class Root extends React.Component {
  render() {
    var initialProps = {
      __html: CircularJSON.stringify(this.props).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
    }
    return (
      <div id="react-output">
        {this.props.children}
        <script
          id='initial-props'
          type='application/json'
          dangerouslySetInnerHTML={initialProps} />
        <script src='/bundle.js' />
      </div>
    )
  }
}
