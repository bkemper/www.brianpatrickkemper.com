import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

import 'typeface-source-sans-pro'; // ugh
import './index.css';

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
