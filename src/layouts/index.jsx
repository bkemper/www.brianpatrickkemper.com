import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import { navigateTo } from 'gatsby-link'

import 'typeface-source-sans-pro';

// ugh, @import wasn't working from index.css
// note, could have used normalize.css
injectGlobal`
  html {
    font-family: 'Source Sans Pro';
    font-size: 10px; /* set for rem */
    font-weight: 100;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  componentDidCatch(error) {
    this.handleError(error, { exFatal: true });
    navigateTo('/404');
  }

  // see, https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
  componentDidMount() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handleError);
  }

  // see, https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics
  // see, https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
  handleError({ message: exDescription }, options) {
    window.ga && window.ga('send', 'exception', { exDescription, exFatal: false, ...options });
  }

  render() {
    return (
      <React.StrictMode>
        {this.props.children()}
      </React.StrictMode>
    );
  }
}
