import React from 'react';
import Link from './Link';

const TextLink = (props) => (
  <Link
    {...props}
    borderColor="color-blue-600"
    borderStyle="dashed"
    borderBottomWidth="1px"
    _focus={{
      borderColor: 'color-blue-800',
      borderStyle: 'solid',
    }}
    _hover={{
      borderColor: 'color-blue-800',
      borderStyle: 'solid',
    }}
  />
);

export default TextLink;
