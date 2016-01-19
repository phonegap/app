import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { Link } from 'react-router'

import Root from './components/root.jsx'
import Index from './components/index.jsx'

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Index} />
  </Route>
)
