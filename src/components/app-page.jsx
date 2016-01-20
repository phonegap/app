import React from 'react'
import data from '../../data'
import { Link } from 'react-router'
import Header from './header.jsx'

export default class AppPage extends React.Component {
  handleClick(e) {
    if(window.fromHome){
      window.fromHome = false
      this.props.history.goBack()
      e.preventDefault()
      e.stopPropagation()
    }
  }
  componentDidMount(){
    this.fromHome = window.fromHome
  }
  render() {
    return (
      <div id="content">
        <Header/>
        <h1>{this.props.params.slug}</h1>
      </div>
    )
  }
}
