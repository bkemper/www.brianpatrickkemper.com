import React from 'react';
import { Text } from '@chakra-ui/react';

const OptionalText = ({ children }) => (
  <React.Fragment>
    <Text as="span" display={['none', 'none', 'none', 'inline-block']}>
      {children}
    </Text>{' '}
  </React.Fragment>
);

export default OptionalText;
