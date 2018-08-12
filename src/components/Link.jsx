import React from 'react'
import * as icons from 'react-feather'
import styled from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import * as colors from '../constants/colors'

const Anchor = styled(OutboundLink)`
  color: ${({ color }) => colors[color.toUpperCase()]};
  text-decoration: none;

  :hover {
    color: ${colors.BLUE};
    transition: color 0.8s;
  }
`

const Link = ({ color = 'grey', href, icon, text }) => {
  const Icon = icons[icon]

  // Must set title of icon for accessiblity
  // SEE: https://www.sitepoint.com/15-rules-making-accessible-links/
  // SEE: https://css-tricks.com/accessible-svgs/
  return (
    <Anchor color={color} href={href}>
      {Icon ? <Icon size={20} title={icon} /> : text}
    </Anchor>
  )
}

export default Link
