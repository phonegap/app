import React from 'react'
import data from '../../data'
import { Link } from 'react-router'
import Header from './header.jsx'
import Footer from './footer.jsx'

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
        <div className="page-content">
          <div className="wrapper">
            <div className="subheader">
              <div className="bounds">
                <h1>App Showcase</h1>
                <div className="subheader__description">Ever wondered who is building amazing apps using PhoneGap? Find out here {/*or <a href="#">share your own</a>*/}.</div>
              </div>
            </div>
            <h1>{this.props.params.slug}</h1>
            <div className="sub-footer">
              <div className="bounds">
                <h2>Share your app with the world</h2>
                <div className="sub-footer__description">We are always on the lookout for high quality apps that are built using PhoneGap — submit your app today.
                  {/* <div><a href="#" className="button--cta">Share Your App</a></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
