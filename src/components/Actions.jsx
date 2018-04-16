import React from 'react';
import styled from 'styled-components';
import * as colors from '../constants/colors';

const Container = styled.div`
  display: flex;
  font-size: 1em;
  justify-content: center;
`;

const Item = styled.div`
  margin: 0 1em;
`;

export default function Actions({ children }) {
  return (
    <Container>
      {children.map((c, i) => <Item key={i}>{c}</Item>)}
    </Container>
  );
}
