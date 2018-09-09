import styled from 'styled-components';

// SEE: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// SEE: https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862
const Container = styled.main`
  align-items: flex-end;
  display: flex;
  font-size: 1em;
  height: 50vh;
  justify-content: center;
  transition: font-size 0.3s;

  /* for phone only */
  @media (max-width: 599px) {
    font-size: .7em;
    transition: font-size 0.3s;
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

export default Container;
