import React from 'react'
import { Link } from 'react-router'
import Footer from './footer.jsx'

import data from '../../data'
import Header from './header.jsx'

export default class Home extends React.Component {
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

            <section className="noteworthy-apps">
              <h1>Noteworthy Apps</h1>
              <ul>
                <li><a href="#">
                  <h2 className="noteworthy--title">Sworkit</h2>
                  <h3 className="noteworthy--description">by Nexercise</h3>
                  <div className="noteworthy--platforms">Available for iOS and Android</div>
                </a></li>
                <li><a href="#">
                  <h2 className="noteworthy--title">Sworkit</h2>
                  <h3 className="noteworthy--description">by Nexercise</h3>
                  <div className="noteworthy--platforms">Available for iOS and Android</div>
                </a></li>
                <li><a href="#">
                  <h2 className="noteworthy--title">Sworkit</h2>
                  <h3 className="noteworthy--description">by Nexercise</h3>
                  <div className="noteworthy--platforms">Available for iOS and Android</div>
                </a></li>
              </ul>
            </section>
            <ul>
            {data.routes.map((permalink, index) =>
              <li key={index}>
                <Link to={"/app"+permalink}>{permalink}</Link>
              </li>
            )}
            </ul>
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
