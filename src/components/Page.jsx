import React from 'react';
import Helmet from 'react-helmet'
import styled from 'styled-components';
import * as colors from '../constants/colors';
import * as keyframes from '../constants/keyframes';

// SEE: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// SEE: https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862
const Container = styled.div`
  align-items: center;
  background-color: ${colors.DARK_BLUE};
  display: flex;
  font-size: 1em;
  height: 100vh;
  justify-content: center;

  /* for phone only */
  @media (max-width: 599px) {
    font-size: .7em;
  }

  /* for tablet portrait */
  @media (min-width: 600px) {}

  /* for tablet landscape */
  @media (min-width: 900px) {}

  /* for desktop */
  @media (min-width: 1200px) {}

  /* for big desktop */
  @media (min-width: 1800px) {}
`;

const Item = styled.div`
  animation: ${keyframes.SHOW} 1s linear;
`;

export default function Page({ children, title }) {
  return (
    <Container>
      <Item>
        <Helmet title={title} />
        {children}
      </Item>
    </Container>
  );
}
