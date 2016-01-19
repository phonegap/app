import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import { Router, RoutingContext, match } from 'react-router'
import CircularJSON from 'circular-json'

import template from './page.jade'
import routes from './routes.jsx'
import Root from './components/root.jsx'
import Index from './components/index.jsx'
import css from '!raw!postcss-loader!stylus!./css/main.styl'

// Client render
if (typeof document !== 'undefined') {
  const history = useScroll(createHistory)()
  const initialProps = CircularJSON.parse(document.getElementById('initial-props').innerHTML)
  const outlet = document.getElementById('react-output');

  ReactDOM.render(<Router history={history} routes={routes} />, outlet)
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)
  const locationArray = location.pathname.split('/').filter(function(n){ return n !== '' })
  let meta = []

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    var reactHTML = renderToString(<RoutingContext {...renderProps} history={history}/>)
    var html = template({pageContent: reactHTML, css: css, meta: meta});
    callback(null, html);
  });
};
