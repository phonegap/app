import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { Link } from 'react-router'

import AppPage from './components/app-page.jsx'
import Root from './components/root.jsx'
import Index from './components/index.jsx'

export default (
  <Route path="/" component={Root} onLeave={() => {window.fromHome = true}}>
    <IndexRoute component={Index} />
    <Route path="/:slug" component={AppPage} />
  </Route>
)
