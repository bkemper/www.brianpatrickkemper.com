import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';

const Link = ({ children, href }) => (
  <ChakraLink
    borderColor="color-blue-600"
    borderStyle="dashed"
    borderBottomWidth="1px"
    color="color-blue-600"
    fontWeight="medium"
    href={href}
    transition=".5s ease-in-out"
    whiteSpace="nowrap"
    _focus={{
      borderColor: 'color-blue-800',
      borderStyle: 'solid',
      color: 'color-blue-800',
      textDecoration: 'none',
    }}
    _hover={{
      borderColor: 'color-blue-800',
      borderStyle: 'solid',
      color: 'color-blue-800',
      textDecoration: 'none',
    }}
  >
    {children}
  </ChakraLink>
);

export default Link;
